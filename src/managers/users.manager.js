import UserRepository from '../repository/user.repository';
import UserService from '../services/user.service';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export default {
  userRepository,
  userService,
};
