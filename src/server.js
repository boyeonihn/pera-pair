// Because we have babel now, we can use ES Module syntax
// const express = require('express'); <- instead of this

import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import morgan from 'morgan';
import MongoStore from 'connect-mongo';
import { rootRouter } from './routers/rootRouter';
import { videoRouter } from './routers/videoRouter';
import { userRouter } from './routers/userRouter';
import { localsMiddleware } from './middlewares';
import { apiRouter } from './routers/apiRouter';
import { postRouter } from './routers/postRouter';

const app = express();
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use((req, res, next) => {
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  res.header('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(flash());
app.use(localsMiddleware);
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('assets'));
app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);
app.use('/api', apiRouter);
app.use('/posts', postRouter);

export default app;
