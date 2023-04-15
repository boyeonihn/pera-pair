import express from 'express';
import { join } from '../controllers/userController';
import { trendingVideos as home } from '../controllers/videoController';

export const globalRouter = express.Router();

globalRouter.get('/', home);
globalRouter.get('/join', join);
