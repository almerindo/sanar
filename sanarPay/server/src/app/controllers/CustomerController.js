import * as Yup from 'yup';

import mundipagg from 'mundipagg-nodejs';
import Customer from '../models/Customer';

class CustomerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    async function createMPCustomer(clientDB) {
      // FIXME Colocar essas duas linhas para um arquivo de configuração
      const customersController = mundipagg.CustomersController;
      mundipagg.Configuration.basicAuthUserName = process.env.MUNDI_PK;

      const request = new mundipagg.CreateCustomerRequest();
      request.name = clientDB.name;
      request.email = clientDB.email;
      request.code = clientDB.id; // ID Local
      let idRemote;

      await customersController
        .createCustomer(request)
        .then(customer => {
          idRemote = customer.id;
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
      // Retorna o ID do cliente remoto (MultiPagg)
      return idRemote;
    }

    const clientData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      remote_id: false,
    };

    // Se já existe cliente retorna erro
    const customerExists = await Customer.findOne({
      where: { email: clientData.email },
    });
    if (customerExists) {
      return res.status(400).json('Error: Email already exists!');
    }

    try {
      // Persiste o cliente em base local.
      const customer = await Customer.create(clientData);
      // Persiste o cliente em base remota e retorna o customerID remoto
      const remoteID = await createMPCustomer(customer);

      if (!remoteID) {
        /** Aqui deveria cadastrar os dados dos clientes que
         * não conseguiram se registrar no gateway de pagamento
         * em um banco de dados chave-valor Redis.
         * E usar um JOB , que verifica os dados que não obtiveram êxito
         * e tenta novamente ou avisa a alguem por e-mail.
         *
         * Por emquanto vou só lançar o erro.
         */

        throw new Error('Erro ao registrar no MundiPagG');
      }
      clientData.remote_id = remoteID;
      // persiste o remoteID no banco. Creio que sem o await deva ficar com mais performance
      await customer.update(clientData);

      return res.status(200).json(customer);
    } catch (error) {
      return res.status(400).json(`Error: ${error}`);
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const customerExists = await Customer.findByPk(req.userID);
    if (!customerExists) {
      return res.status(404).json('Algo errado! Usuário não encontrado!');
    }
    if (customerExists.canceled_at) {
      return res.status(400).json('Usuário está cancelado!');
    }

    const data = req.body;
    await customerExists.update(data);
    await customerExists.save();
    return res.status(200).json(customerExists);
  }

  async delete(req, res) {
    if (req.params.id !== String(req.userID)) {
      return res.status(405).json('Não tem permissão para deletar!');
    }
    const customerExists = await Customer.findByPk(req.userID);
    if (!customerExists) {
      return res.status(404).json('Algo errado! Usuário não encontrado!');
    }
    if (customerExists.canceled_at) {
      return res.status(400).json('Usuário Já cancelado!');
    }

    if (!customerExists.checkPassword(req.body.password)) {
      return res.status(401).json('A senha de confirmação não confere!');
    }

    // APAGAR LOGICAMENTE
    // customerExists.canceled_at = new Date();
    // await customerExists.save();

    // APAGAR FISICAMENTE
    await customerExists.destroy();

    return res.status(200).json(customerExists);
  }
}
export default new CustomerController();
