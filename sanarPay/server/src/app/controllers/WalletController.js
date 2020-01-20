import mundipagg from 'mundipagg-nodejs';
import * as Yup from 'yup';

import Customer from '../models/Customer';
import Card from '../models/Card';

class WalletController {
  async store(req, res) {
    const schema = Yup.object().shape({
      card: Yup.object()
        .shape({
          number: Yup.string().required(),
          holder_name: Yup.string().required(),
          holder_document: Yup.string().required(),
          exp_month: Yup.number().required(),
          exp_year: Yup.number().required(),
          cvv: Yup.number().required(),
        })
        .required('Informe os dados do cartão!'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails` });
    }
    //

    async function createMPCard() {
      mundipagg.Configuration.basicAuthUserName = process.env.MUNDI_PK;
      const customersController = mundipagg.CustomersController;
      const localCustomer = await Customer.findByPk(req.userID);

      const request = new mundipagg.CreateCardRequest();
      request.customer_id = req.body.customer_id;
      request.number = req.body.card.number;
      request.holder_name = req.body.card.holder_name;
      request.holder_document = req.body.card.holder_document;
      request.exp_month = req.body.card.exp_month;
      request.exp_year = req.body.card.exp_year;
      request.cvv = req.body.card.cvv;

      const customerId = localCustomer.remote_id;

      const result = customersController
        .getCustomer(customerId)
        .then(customer => {
          return customersController.createCard(customer.id, request);
        })
        .then(card => {
          return card;
        })
        .catch(error => {
          if (error.errorResponse instanceof mundipagg.ErrorException) {
            // Capturando se erro for do mundipagg, para uso futuro
            throw new Error({
              error: {
                message: error.errorResponse.message,
                erros: error.errorResponse.errors,
              },
            });
          } else {
            throw error;
          }
        });

      return result;
    }

    // criando o cartao para o Cliente logado
    const remoteCard = await createMPCard();
    // console.log({ status: 'CRIADO', CartaoRemoto: remoteCard });

    // Persistindo no banco local
    if (!remoteCard) {
      return res
        .status(400)
        .json('Não foi possivel guardar o cartão no servidor remoto');
    }

    const data = {
      remote_id: remoteCard.id,
      customer_id: req.userID,
      holder_name: req.body.card.holder_name,
      number: req.body.card.number,
      exp_month: req.body.card.exp_month,
      exp_year: req.body.card.exp_year,
      cvv: req.body.card.cvv,
    };

    // Verifica se já tem um cartão com esse número cadastrado para esse client
    const cardExist = await Card.findOne({
      where: { remote_id: remoteCard.id, customer_id: req.userID },
    });

    if (cardExist) {
      return res
        .status(400)
        .json(
          `Cartao (Ultimos 4 Numeros: ${remoteCard.lastFourDigits}) já foi cadastrado para este cliente`
        );
    }

    try {
      const card = await Card.create(data);

      return res.status(200).json(card);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        name: error.name,
      });
    }
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      card: Yup.object()
        .shape({
          remote_id: Yup.string().required(),
        })
        .required('Informe os dados do cartão!'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails` });
    }

    // Localiza o Cliente no banco de dados e captura os ID remotos
    const localCustomer = await Customer.findByPk(req.userID);
    const customerId = localCustomer.remote_id;
    const remoteCardId = req.body.card.remote_id;
    // verifica se o cartao está associado localmente a este cliente
    const cardExist = await Card.findOne({
      where: { remote_id: remoteCardId, customer_id: req.userID },
    });

    if (!cardExist) {
      return res.status(404).json({
        error: `Cartão ${remoteCardId} não associado ao Usuário: ${customerId}`,
      });
    }

    // Conecta e apaga o cartão do cliente
    async function deleteMPCard() {
      mundipagg.Configuration.basicAuthUserName = process.env.MUNDI_PK;
      const customersController = mundipagg.CustomersController;

      const result = await customersController
        .getCustomer(customerId)
        .then(customer => {
          return customersController.deleteCard(customer.id, remoteCardId);
        })
        .then(card => {
          return card;
        })
        .catch(error => {
          if (error.errorResponse instanceof mundipagg.ErrorException) {
            // Capturando se erro for do mundipagg, para uso futuro
            throw new Error({
              error: {
                message: error.errorResponse.message,
                erros: error.errorResponse.errors,
              },
            });
          } else {
            throw error;
          }
        });

      return result;
    }

    const card = await deleteMPCard();
    // Apagar da base local também
    await cardExist.destroy();

    return res.status(200).json({ remoteCard: card });
  }

  async index(req, res) {
    // Captura o cliente logado

    const items = await Customer.findOne({
      where: { id: req.userID },
      attributes: ['name', 'email', 'remote_id'],
      include: [
        {
          model: Card,
          as: 'cards',
          attributes: ['remote_id'],
        },
      ],
    });

    return res.status(200).json(items);
  }
}
export default new WalletController();
