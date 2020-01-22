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
      where: { email: clientData.email },
    });
    if (customerExists) {
      return res.status(400).json({ error: 'Usuário já existe!' });
    }

    try {
      // Persiste o cliente em base local.
      const customer = await Customer.create(clientData);
      // Persiste o cliente em base remota e retorna o customerID remoto
      const remoteID = await MundiPagg.setCustomer(clientData);

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
      await customer.update(clientData);

      return res.status(200).json(customer);
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
    if (req.params.id !== String(req.userID)) {
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
