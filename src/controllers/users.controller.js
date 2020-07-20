import { Op } from 'sequelize';
import { validationResult } from 'express-validator';
import * as bcrypt from 'bcrypt';

import models from '../models/index';

const User = models.User;

export async function create(req, res, next) {
  const { name, username, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((value) => value.msg);
    return res.status(417).json({ errors: errorMessages });
  }

  const existingUser = await validateExistingUser(username, email);
  if (existingUser.length > 0) {
    return res.status(417).json('Username or email already exists!');
  }

  const encryptedPassword = await getEncryptedPassword(password);

  try {
    await User.create({
      name,
      username,
      email,
      password: encryptedPassword,
    });

    return res.status(201).json();
  } catch (error) {
    console.error(error);
    return res.status(500).json();
  }
}

async function validateExistingUser(username = '', email = '') {
  return await User.findAll({
    where: {
      [Op.or]: [{ username }, { email }],
    },
  });
}

async function getEncryptedPassword(password) {
  const saltRounds = 10;
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
}
