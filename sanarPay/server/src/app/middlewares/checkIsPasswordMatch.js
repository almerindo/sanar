import * as Yup from 'yup';
import Customer from '../models/Customer';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    password: Yup.number().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: `Password deve ser informado!` });
  }
  try {
    const customer = await Customer.findByPk(req.userID);

    if (!(await customer.checkPassword(req.body.password))) {
      return res.status(405).json({ error: 'Password não confere!' });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Verificação de password falhou!' });
  }
};
