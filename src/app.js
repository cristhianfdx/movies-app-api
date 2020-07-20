import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

import createError from 'http-errors';
import Express, { json, urlencoded } from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import '@babel/polyfill';

import indexRouter from './routes/index';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import moviesRouter from './routes/movies';

const app = Express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

// Routes
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// catch 405 and forward to error handler
app.use(function (req, res, next) {
  next(createError(405));
});

// catch 417 and forward to error handler
app.use(function (req, res, next) {
  next(createError(417));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

export default app;
