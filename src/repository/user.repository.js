import { Op } from 'sequelize';

import models from '../models/index';
import { encryptPassword } from '../handlers/password-handler';

class UserRepository {
  constructor() {
    this.user = models.User;
  }

  async create(user) {
    user.password = await encryptPassword(user.password);
    return await this.user.create(user);
  }

  async getByUsernameOrEmail(username, email) {
    return await this.user.findAll({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
  }
}

export default UserRepository;
