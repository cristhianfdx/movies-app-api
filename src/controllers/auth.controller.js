import * as jwt from 'jsonwebtoken';

import models from '../models/index';
import { comparePassword } from '../handlers/password-handler';

const User = models.User;

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await getUser(username);

  if (!user) return res.status(417).json('User not exists.');

  const checkPassword = await comparePassword(password, user.password);
  if (!checkPassword) return res.status(401).json('Invalid credentials.');

  return res.status(200).json({ token: getGeneratedToken(user) });
}

async function getUser(username) {
  const user = await User.findOne({
    where: { username },
  });
  return user;
}

function getGeneratedToken(user) {
  const { id, name, username, email } = user;
  return jwt.sign(
    {
      id,
      name,
      username,
      email,
    },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '24h' }
  );
}
