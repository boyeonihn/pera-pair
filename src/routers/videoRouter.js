import express from 'express';
import { watch, edit } from '../controllers/videoController';

export const videoRouter = express.Router();

videoRouter.get('/watch', watch);
videoRouter.get('/edit', edit);
