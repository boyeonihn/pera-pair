import express from 'express';
import {
  remove,
  getEdit,
  postEdit,
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
} from '../controllers/userController';

export const userRouter = express.Router();

userRouter.route('/edit').get(getEdit).post(postEdit);
userRouter.get('/delete', remove);
userRouter.get(':id', see);
userRouter.get('/github/start', startGithubLogin);
userRouter.get('/github/finish', finishGithubLogin);
