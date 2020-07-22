import { Router } from 'express';

import UserController from '../controllers/users.controller';
import { userService } from '../managers/users.manager';
import { createUserValidators } from './validators/create-user-validator';

const router = Router();
const controller = new UserController(userService);

router
  .route('/')
  .post(createUserValidators, (req, res) => controller.create(req, res));

export default router;
