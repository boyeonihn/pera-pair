import { Video } from '../models/Video';
import { Post } from '../models/Post';
import { User } from '../models/User';

export const about = (req, res) => {
  return res.render('about', { pageTitle: 'About Us' });
};

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: 'desc' })
    .populate('owner');
  const posts = await Post.find({})
    .sort({ createdAt: 'desc' })
    .populate('owner');
  return res.render('home', { pageTitle: 'Home', videos, posts });
};
