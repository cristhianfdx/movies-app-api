import { body } from 'express-validator';

export const createFavoriteValidators = [
  body('name')
    .isLength({ min: 4, max: 50 })
    .withMessage('Name must be between 4 and 50 characters.'),
  body('movieId').isLength({ min: 1 }).withMessage('Movie Id is required.'),
];
