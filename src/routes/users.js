import { Router } from 'express';

import { create } from '../controllers/users.controller';
import { createUserValidators } from './validators/create-user-validator';

const router = Router();

router.route('/').post(createUserValidators, create);

export default router;
