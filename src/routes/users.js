import { Router } from 'express';

import { userService } from '../managers/users.manager';
import UserController from '../controllers/users.controller';
import { createUserValidators } from './validators/create-user-validator';

const router = Router();
const controller = new UserController(userService);

router.post('/', createUserValidators, (req, res) =>
  controller.create(req, res)
);

export default router;
