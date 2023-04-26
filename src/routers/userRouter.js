import express from 'express';
import {
  remove,
  edit,
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
} from '../controllers/userController';

export const userRouter = express.Router();

userRouter.get('/edit', edit);
userRouter.get('/delete', remove);
userRouter.get(':id', see);
userRouter.get('/github/start', startGithubLogin);
userRouter.get('/github/finish', finishGithubLogin);
