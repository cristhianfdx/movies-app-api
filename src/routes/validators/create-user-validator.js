import { body } from 'express-validator';

export const createUserValidators = [
  body('name')
    .isLength({ min: 4, max: 50 })
    .withMessage('Name must be between 4 and 50 characters.'),
  body('username')
    .isLength({ min: 4, max: 20 })
    .withMessage('Username must be between 4 and 20 characters.'),
  body('password')
    .isLength({ min: 6, max: 14 })
    .withMessage('Password must be between 6 and 14 characters.'),
  body('email').isEmail().withMessage('Email must have a valid format'),
];
