import * as Yup from 'yup';
import { Op } from 'sequelize';

import Customer from '../models/Customer';
import Card from '../models/Card';

import MundiPagg from './util/MundiPagg';

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
    const { card } = req.body;

    // Verifica se já tem um cartão com esse número cadastrado para esse client
    const cardExist = await Card.findOne({
      where: { number: card.number, customer_id: req.userID },
    });

    if (cardExist) {
      return res
        .status(400)
        .json(
          `Cartao (Ultimos 4 Numeros: ${card.number}) já foi cadastrado para este cliente`
        );
    }

    try {
      const wallet = await MundiPagg.createWallet({
        customer_id: req.userRemoteID,
        card,
      });
      if (!wallet) {
        return res.status(400).json({
          error: 'Não foi possivel guardar o cartão !',
        });
      }
      console.log('wallet');
      console.log(wallet);

      const data = {
        remote_id: wallet.id,
        customer_id: req.userID,
        holder_name: req.body.card.holder_name,
        number: req.body.card.number,
        exp_month: req.body.card.exp_month,
        exp_year: req.body.card.exp_year,
        cvv: req.body.card.cvv,
      };
      console.log('data');

      console.log(data);

      await Card.create(data);

      return res.status(200).json(wallet);
    } catch (error) {
      return res.status(400).json({
        error: 'Não foi possivel cadastrar novo cartao',
        detail: error,
      });
    }
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      cardId: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: `Validation fails` });
    }

    const card = await MundiPagg.deleteWallet({
      customerId: req.params.userRemoteID,
      cardId: req.params.card,
    });

    req.cardFound.canceled_at = new Date();
    await req.cardFound.save();
    // Apagar da base local também
    // await cardExist.destroy();

    return res.status(200).json({ remoteCard: card });
  }

  async index(req, res) {
    return res.status(200).json(req.cards);
  }
}
export default new WalletController();
