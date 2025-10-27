import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const createToken = (payload) => {
  const secret = process.env.JWT_SECRET;

  const options = { expiresIn: '1d' };

  return jwt.sign({ ...payload }, secret, options);
};

export default createToken;
