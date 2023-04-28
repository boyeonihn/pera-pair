import express from 'express';
import {
  remove,
  getEdit,
  postEdit,
  see,
  startGithubLogin,
  finishGithubLogin,
  getChangePw,
  postChangePw,
} from '../controllers/userController';
import {
  protectUrlMiddleware,
  publicOnlyMiddleware,
  passwordsUsersOnlyMiddleware,
  uploadAvatar,
} from '../middlewares';

export const userRouter = express.Router();

userRouter
  .route('/edit')
  .all(protectUrlMiddleware)
  .get(getEdit)
  .post(uploadAvatar.single('avatar'), postEdit);
userRouter.get('/delete', remove);
userRouter.get(':id', see);
userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin);
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin);
userRouter
  .route('/change-password')
  .all(protectUrlMiddleware, passwordsUsersOnlyMiddleware)
  .get(getChangePw)
  .post(postChangePw);
