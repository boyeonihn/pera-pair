import express from 'express';

export const globalRouter = express.Router();
const handleHome = (req, res) => res.send('Home');

globalRouter.get('/', handleHome);
