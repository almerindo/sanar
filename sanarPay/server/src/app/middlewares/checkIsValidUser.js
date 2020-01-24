import { Op } from 'sequelize';
import Customer from '../models/Customer';
import Card from '../models/Card';

export default async (req, res, next) => {
  try {
    const customer = await Customer.findOne({
      where: {
        id: req.userID,
        remote_id: req.userRemoteID,
        canceled_at: {
          [Op.eq]: null,
        },
      },
      include: [
        {
          model: Card,
          as: 'cards',
        },
      ],
    });

    if (!customer) {
      return res.status(404).json({ error: 'Usuário inválido!' });
    }

    req.cards = customer.cards;
    console.log(
      '#################################################################################'
    );
    console.log(req.cards);

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Middleware de Verificacao de Usuário falhou' });
  }
};
