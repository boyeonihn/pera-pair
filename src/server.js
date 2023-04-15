// Because we have babel now, we can use ES Module syntax
// const express = require('express'); <- instead of this
import express from 'express';
import morgan from 'morgan';

const PORT = 4000;
const app = express();
const logger = morgan('dev');
app.use(logger);

const globalRouter = express.Router();

const handleHome = (req, res) => res.send('Home');
globalRouter.get('/', handleHome);

const userRouter = express.Router();

const handleEditUser = (req, res) => res.send('Edit User');

userRouter.get('/edit', handleEditUser);

const handleWatchVideo = (req, res) => res.send('Watch Video');

const videoRouter = express.Router();
videoRouter.get('/watch', handleWatchVideo);

app.use('/', globalRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);

const handleListening = () => {
  console.log(`I am listening maintenant on localhost:${PORT}`);
};
app.listen(PORT, handleListening);
