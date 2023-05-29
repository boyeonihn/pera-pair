import express from 'express';
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from '../controllers/videoController';
import { protectUrlMiddleware, uploadVideo } from '../middlewares';

export const videoRouter = express.Router();

videoRouter
  .route('/upload')
  .all(protectUrlMiddleware)
  .get(getUpload)
  .post(
    uploadVideo.fields([
      { name: 'video', maxCount: 1 },
      { name: 'thumb', maxCount: 1 },
    ]),
    postUpload
  );
videoRouter.get('/:id([0-9a-f]{24})', watch);

videoRouter
  .route('/:id([0-9a-f]{24})/edit')
  .all(protectUrlMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter.all(protectUrlMiddleware).get('/:id/delete', deleteVideo);
