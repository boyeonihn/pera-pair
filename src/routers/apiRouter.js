import express from 'express';
import {
  registerVideoView,
  createVideoComment,
  deleteVideoComment,
} from '../controllers/videoController';
import {
  registerPostView,
  createPostComment,
  deletePostComment,
} from '../controllers/postController';

export const apiRouter = express.Router();

apiRouter.post('/videos/:id([0-9a-f]{24})/view', registerVideoView);
apiRouter.post('/videos/:id([0-9a-f]{24})/comment', createVideoComment);
apiRouter.delete('/videos/:id([0-9a-f]{24})/comment', deleteVideoComment);
apiRouter.post('/posts/:id([0-9a-f]{24})/view', registerPostView);
apiRouter.post('/posts/:id([0-9a-f]{24})/comment', createPostComment);
apiRouter.delete('/posts/:id([0-9a-f]{24})/comment', deletePostComment);
