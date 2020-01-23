import * as Yup from 'yup';
import { Op } from 'sequelize';

import Customer from '../models/Customer';

import MundiPagg from './util/MundiPagg';

class CustomerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails', status: 400 });
    }

    const clientData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    // Se já existe cliente retorna erro
    const customerExists = await Customer.findOne({
      where: {
        email: clientData.email,
      },
    });

    if (customerExists && !customerExists.canceled_at) {
      return res.status(400).json({ error: 'Usuário já existe!' });
    }

    try {
      const remoteCustomer = await MundiPagg.createCustomer(clientData);
      clientData.remote_id = remoteCustomer.id;
      // Se ja esxiste ativa a conta
      if (customerExists && customerExists.canceled_at) {
        clientData.canceled_at = null;
        await customerExists.update(clientData);
      } else {
        // Se nao atualiza
        await Customer.create(clientData);
      }

      return res.status(200).json(remoteCustomer);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      newPassword: Yup.string().required(),
      oldPassword: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (req.params.cus !== String(req.userRemoteID)) {
      return res.status(405).json({ error: 'Não tem permissão para update!' });
    }

    // Verifica na base local se existe ou se já foi cancelado.
    const customerExists = await Customer.findOne({
      where: {
        id: req.userID,
        canceled_at: {
          [Op.eq]: null,
        },
      },
    });

    if (!customerExists) {
      return res.status(404).json({
        error: 'Algo errado! Usuário não encontrado! ou já cancelado',
      });
    }
    const { oldPassword, newPassword } = req.body;

    if (oldPassword && !(await customerExists.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    customerExists.password = newPassword;
    await customerExists.save();
    return res.status(200).json(customerExists);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails', status: 400 });
    }

    if (req.params.cus !== String(req.userRemoteID)) {
      return res.status(405).json({ error: 'Não tem permissão para deletar!' });
    }

    // Verifica na base local se existe ou se já foi cancelado.
    const customerExists = await Customer.findOne({
      where: {
        id: req.userID,
        canceled_at: {
          [Op.eq]: null,
        },
      },
    });

    if (!customerExists) {
      return res.status(404).json({
        error: 'Usuário não encontrado! ou já cancelado',
      });
    }

    const { email, password } = req.body;

    if (email !== customerExists.email) {
      return res.status(401).json({
        error: 'Email não confere com o usuário logado!',
      });
    }

    if (!customerExists.checkPassword(password)) {
      return res.status(401).json({
        error: 'A senha de confirmação não confere!',
      });
    }

    // APAGAR FISICAMENTE
    // await customerExists.destroy();

    // APAGAR LOGICAMENTE
    customerExists.canceled_at = new Date();
    await customerExists.save();

    // API da MundipagG não dá possibilidade de apagar o Customer

    return res.status(200).json(customerExists);
  }
}
export default new CustomerController();
