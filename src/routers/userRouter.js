import express from 'express';
import {
  remove,
  getEdit,
  postEdit,
  startGithubLogin,
  finishGithubLogin,
  getChangePw,
  postChangePw,
  getProfile,
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
userRouter.get('/:id', getProfile);
userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin);
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin);
userRouter
  .route('/change-password')
  .all(protectUrlMiddleware, passwordsUsersOnlyMiddleware)
  .get(getChangePw)
  .post(postChangePw);
