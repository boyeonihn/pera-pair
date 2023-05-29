import express from 'express';
import { protectUrlMiddleware, uploadPost } from '../middlewares.js';
import {
  getCreate,
  postCreate,
  getEdit,
  postEdit,
  getPost,
} from '../controllers/postController.js';

export const postRouter = express.Router();

postRouter
  .route('/create')
  .all(protectUrlMiddleware)
  .get(getCreate)
  .post(uploadPost.single('picture'), postCreate);

postRouter.get('/:id([0-9a-f]{24})', getPost);
postRouter
  .route('/:id([0-9a-f]{24})/edit')
  .all(protectUrlMiddleware)
  .get(getEdit)
  .post(postEdit);
