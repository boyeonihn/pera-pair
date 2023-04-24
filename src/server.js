// Because we have babel now, we can use ES Module syntax
// const express = require('express'); <- instead of this

import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import { rootRouter } from './routers/rootRouter';
import { videoRouter } from './routers/videoRouter';
import { userRouter } from './routers/userRouter';
import { localsMiddleware } from './middlewares';

const app = express();
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'Hello!',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(localsMiddleware);
app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);

export default app;
