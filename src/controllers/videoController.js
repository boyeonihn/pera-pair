import { Video } from '../models/Video';
import { User } from '../models/User';
import { Comment } from '../models/Comment';

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: 'desc' })
    .populate('owner');
  return res.render('home', { pageTitle: 'Home', videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id)
    .populate('owner')
    .populate({
      path: 'comments',
      populate: {
        path: 'owner',
        model: 'User',
      },
    });
  if (video) {
    return res.render('watch', { pageTitle: video.title, video });
  }
  return res.render('404', { pageTitle: 'Video Not Found' });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const { user: _id } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.render('404', { pageTitle: 'Video Not Found' });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash('error', 'Not authorized');
    return res.status(403).redirect('/');
  }
  return res.render('edit', { pageTitle: `Edit ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video Not Found' });
  }

  if (String(video.owner) !== String(_id)) {
    req.flash('error', 'Not authorized to edit');
    return res.status(403).redirect('/');
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash('info', 'Video updated');
  return res.redirect(`/videos/${id}`);
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.exists({ _id: id });
  const {
    user: { _id },
  } = req.session;

  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video Not Found' });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash('error', 'Not authorized to delete');
    return res.status(403).redirect('/');
  }
  await Video.findByIdAndDelete(id);
  req.flash('info', 'Video deletion successful');
  return res.redirect(`/`);
};
export const getUpload = (req, res) =>
  res.render('upload', { pageTitle: `Uploading Video` });

export const postUpload = async (req, res) => {
  const {
    files: { video, thumb },
    session: {
      user: { _id },
    },
    body: { title, description, hashtags },
  } = req;

  try {
    const newVideo = await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      fileUrl: video[0].path,
      thumbUrl: Video.changePathFormula(thumb[0].path),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    req.flash('info', 'Video Uploaded');
    return res.redirect(`/`);
  } catch (error) {
    const errorMsg = error._message;
    return res.status(400).render('upload', {
      pageTitle: `Uploading Video`,
      error: errorMsg,
    });
  }
};

export const search = async (req, res) => {
  const { keyword } = req.query;

  if (keyword) {
    const videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, 'i'),
      },
    }).populate('owner');
    return res.render('search', { pageTitle: 'Search Results', videos });
  }

  return res.render('search', { pageTitle: 'Search' });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views += 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    body: { text },
    session: {
      user: { _id },
    },
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    const user = await User.findById(_id);

    if (!video) {
      return res.sendStatus(404);
    }

    const newComment = await Comment.create({
      text,
      owner: _id,
      video: id,
    });

    video.comments.push(newComment._id);
    video.save();
    user.comments.push(newComment._id);
    user.save();

    return res.sendStatus(201);
  } catch (error) {
    const errorMsg = error._message;
    return res.status(400).render('watch', {
      pageTitle: `Watch`,
      error: errorMsg,
    });
  }
};

export const deleteComment = async (req, res) => {
  const {
    body: { id },
    session: {
      user: { _id: userId },
    },
    params: { id: videoId },
  } = req;

  const video = await Video.findById(videoId);
  if (!video) {
    return res.sendStatus(404);
  }

  video.comments = video.comments.filter((comment) => comment !== id);
  video.save();

  await Comment.findByIdAndDelete(id);
  console.log('SUCCESS');
  return res.sendStatus(200);
};
