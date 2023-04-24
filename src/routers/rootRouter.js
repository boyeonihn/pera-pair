import express from 'express';
import { getJoin, postJoin, login } from '../controllers/userController';
import { home, search } from '../controllers/videoController';

export const rootRouter = express.Router();

rootRouter.get('/', home);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.get('/login', login);
rootRouter.get('/search', search);
// rootRouter.get('/search', search);
