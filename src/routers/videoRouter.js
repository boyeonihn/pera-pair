import express from 'express';
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from '../controllers/videoController';

export const videoRouter = express.Router();

videoRouter.route('/upload').get(getUpload).post(postUpload); // need to put this on the top because express might consider "upload" as a valid :id parameter
videoRouter.get('/:id', watch);
// videoRouter.get('/:id/edit', getEdit);
// videoRouter.post('/:id/edit', postEdit);
// You can do both post/get request in one line of code

videoRouter.route('/:id/edit').get(getEdit).post(postEdit);
// videoRouter.get('/:id/remove', remove);
