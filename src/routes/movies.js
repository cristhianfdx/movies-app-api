import { Router } from 'express';

import { authenticateToken } from '../middlewares/jwt_middleware';
import {
  getPopular,
  getDetail,
  getNow,
  createFavorite,
  getFavorites,
  deleteFavorites,
} from '../controllers/movies.controller';

import { createFavoriteValidators } from './validators/create-favorite-validator';

const router = Router();

router.get('/popular', authenticateToken, getPopular);
router.get('/:id', authenticateToken, getDetail);
router.get('/now_playing', authenticateToken, getNow);
router.get('/favorites/:user_id', authenticateToken, getFavorites);
router.delete('/favorites/:user_id', authenticateToken, deleteFavorites);
router
  .route('/')
  .post(createFavoriteValidators, authenticateToken, createFavorite);

export default router;
