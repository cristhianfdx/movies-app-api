import axios from 'axios';

const URL_BASE = 'https://api.themoviedb.org/3';
const URLS = {
  popular: '/movie/popular',
  detail: '/movie',
  nowPlaying: '/movie/now_playing',
};

export async function getPopularMovies(page = 1) {
  try {
    const { data } = await axios.get(`${URL_BASE}${URLS['popular']}`, {
      params: { api_key: process.env.TMDB_API_KEY, page },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Unavailable service.');
  }
}

export async function getMovieDetail(movieId = '') {
  try {
    const { data } = await axios.get(
      `${URL_BASE}${URLS['detail']}/${movieId}`,
      {
        params: { api_key: process.env.TMDB_API_KEY },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Unavailable service.');
  }
}

export async function getNowPlaying() {
  try {
    const { data } = await axios.get(`${URL_BASE}${URLS['nowPlaying']}`, {
      params: { api_key: process.env.TMDB_API_KEY },
    });
    return data['results'];
  } catch (error) {
    console.error(error);
    throw new Error('Unavailable service.');
  }
}
