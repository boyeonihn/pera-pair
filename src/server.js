// Because we have babel now, we can use ES Module syntax
// const express = require('express'); <- instead of this
import express from 'express';
import morgan from 'morgan';
import { globalRouter as global } from './routers/globalRouter';
import { videoRouter } from './routers/videoRouter';
import { userRouter } from './routers/userRouter';

const PORT = 4000;
const app = express();
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(logger);
app.use('/', global);
app.use('/users', userRouter);
app.use('/videos', videoRouter);

const handleListening = () => {
  console.log(`I am listening maintenant on localhost:${PORT}`);
};
app.listen(PORT, handleListening);
