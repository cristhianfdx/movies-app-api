import { validationResult } from 'express-validator';

import {
  getPopularMovies,
  getMovieDetail,
  getNowPlaying,
} from '../providers/tmdb/tmdb.provider';

import models from '../models/index';

const FAVORITE_MOVIE_ERROR_MESSAGE = 'User does not have favorite movies.';

const Movie = models.Movie;
const UserMovie = models.UserMovie;

export async function getPopular(req, res) {
  try {
    const popularMovies = await getPopularMovies();
    res.status(200).json(popularMovies);
  } catch (error) {
    console.error(error);
    res.status(417).json(error);
  }
}

export async function getDetail(req, res) {
  try {
    const movie = await getMovieDetail(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(417).json(error);
  }
}

export async function getNow(req, res) {
  try {
    const movies = await getNowPlaying();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(417).json(error);
  }
}

export async function createFavorite(req, res, next) {
  const { userId } = req.params.user_id;
  const { name, movieId } = req.body;
  console.log(userId);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((value) => value.msg);
    return res.status(417).json({ errors: errorMessages });
  }

  try {
    const { id } = await Movie.create({ id: movieId, name });
    await UserMovie.create({ userId, movieId: id });
    return res.status(201).json();
  } catch (error) {
    console.error(error);
    if (error['name'] === 'SequelizeUniqueConstraintError')
      return res.status(417).json('Movie already exists.');
    return res.status(500).json();
  }
}

export async function getFavorites(req, res) {
  const userId = req.params.user_id;
  try {
    const favorites = await UserMovie.findAll({
      where: { userId },
    });
    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    const message = error.message;
    if (message === FAVORITE_MOVIE_ERROR_MESSAGE)
      return res.status(417).json(message);
    return res.status(500).json();
  }
}

export async function deleteFavorites(req, res) {
  const userId = req.params.user_id;
  try {
    const favorites = await getValidateFavorites(userId);
    const movieId = favorites.map((v) => v.movieId).shift();

    await UserMovie.destroy({ where: { userId } });
    await Movie.destroy({ where: { id: movieId } });

    return res.status(200).json();
  } catch (error) {
    console.error(error);
    const message = error.message;
    if (message === FAVORITE_MOVIE_ERROR_MESSAGE)
      return res.status(417).json(message);
    return res.status(500).json();
  }
}

async function getValidateFavorites(userId) {
  const favorites = await UserMovie.findAll({
    where: { userId },
  });
  if (favorites.length > 0) return favorites;
  throw new Error(FAVORITE_MOVIE_ERROR_MESSAGE);
}
