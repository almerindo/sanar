import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Customer from '../models/Customer';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const customer = await Customer.findOne({
      where: { email },
      // include: [
      //   {
      //     model: Plan,
      //     as: 'plan',
      //     attributes: ['id', 'name'],
      //   },
      // ],
    });

    if (!customer) {
      return res.status(401).json({ error: `Customer ${email} not found.` });
    }

    if (!(await customer.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name } = customer;

    return res.json({
      customer: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
