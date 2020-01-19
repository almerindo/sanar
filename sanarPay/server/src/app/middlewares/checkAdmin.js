import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // ID do admin é 0 (zero) //Pegando pelo ID mas poderia ser por grupo...
    if (decoded.id !== 0) {
      return res.status(401).json({ error: 'User is not a Admin' });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
