class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(user) {
    return await this.userRepository.create(user);
  }

  async validateIfUserExists(username = '', email = '') {
    const user = await this.userRepository.getByUsernameOrEmail(
      username,
      email
    );

    return user.shift();
  }
}

export default UserService;
