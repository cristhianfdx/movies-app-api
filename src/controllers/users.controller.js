import { validationResult } from 'express-validator';

class UsersController {
  constructor(userService) {
    this.userService = userService;
  }

  async create(req, res) {
    const { name, username, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((value) => value.msg);
      return res.status(417).json({ errors: errorMessages });
    }

    const existingUser = await this.userService.validateIfUserExists(
      username,
      email
    );
    if (existingUser) {
      return res.status(417).json('Username or email already exists!');
    }

    try {
      await this.userService.create({ name, username, email, password });
      return res.status(201).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json();
    }
  }
}

export default UsersController;
