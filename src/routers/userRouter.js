import express from 'express';
import {
  remove,
  getEdit,
  postEdit,
  see,
  startGithubLogin,
  finishGithubLogin,
} from '../controllers/userController';
import { protectUrlMiddleware, publicOnlyMiddleware } from '../middlewares';

export const userRouter = express.Router();

userRouter.route('/edit').all(protectUrlMiddleware).get(getEdit).post(postEdit);
userRouter.get('/delete', remove);
userRouter.get(':id', see);
userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin);
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin);
