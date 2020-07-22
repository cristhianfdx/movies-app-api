import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';

import models from '../models/index';

class UserRepository {
  constructor() {
    this.user = models.User;
  }

  async create(user) {
    const { name, username, email, password } = user;
    const encryptedPassword = await this.getEncryptedPassword(password);
    return await this.user.create({
      name,
      username,
      email,
      password: encryptedPassword,
    });
  }

  async getByUsernameOrEmail(username = '', email = '') {
    return await this.user.findAll({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
  }

  async getEncryptedPassword(password) {
    const saltRounds = 10;
    return await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  }
}

export default UserRepository;
