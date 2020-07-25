import { Router } from 'express';

import {
  getPopular,
  getDetail,
  getNow,
  createFavorite,
  getFavorites,
  deleteFavorites,
} from '../controllers/movies.controller';

import { createFavoriteValidators } from './validators/create-favorite-validator';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.get('/popular', authenticate, getPopular);
router.get('/', authenticate, getDetail);
router.get('/now_playing', authenticate, getNow);
router.get('/favorites', authenticate, getFavorites);

router
  .route('/favorites/:user_id')
  .post(createFavoriteValidators, authenticate, createFavorite);

router.delete('/favorites/:user_id', authenticate, deleteFavorites);

export default router;
