import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import models from '../models/index';

const User = models.User;

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await getUser(username);

  if (!user) return res.status(417).json('User not exists.');

  const checkPassword = await isValidPassword(password, user.password);
  if (!checkPassword) return res.status(401).json('Invalid credentials.');

  return res.status(200).json({ token: getGeneratedToken(user) });
}

async function isValidPassword(password, hash) {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

async function getUser(username) {
  const user = await User.findAll({
    where: { username },
  });
  return user.map((v) => v).shift();
}

function getGeneratedToken(user) {
  const { name, username, email } = user;
  return jwt.sign(
    {
      name,
      username,
      email,
    },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '24h' }
  );
}
