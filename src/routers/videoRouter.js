import express from 'express';

export const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send('Watch Video');

videoRouter.get('/watch', handleWatchVideo);
