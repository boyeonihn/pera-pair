import express from 'express';
import { see, edit, upload, remove } from '../controllers/videoController';

export const videoRouter = express.Router();

videoRouter.get('/upload', upload); // need to put this on the top because express might consider "upload" as a valid :id parameter
videoRouter.get('/:id', see);
videoRouter.get('/:id/edit', edit);
videoRouter.get('/:id/remove', remove);
