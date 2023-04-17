import express from 'express';
import { join, login } from '../controllers/userController';
import { trendingVideos as home, search } from '../controllers/videoController';

export const globalRouter = express.Router();

globalRouter.get('/', home);
globalRouter.get('/join', join);
globalRouter.get('/login', login);
globalRouter.get('/search', search);
