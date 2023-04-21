import { Video } from '../models/Video';
export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render('home', { pageTitle: 'Home', videos });
};

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render('watch', { pageTitle: `Watching` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render('edit', { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const search = (req, res) => res.send('Search video');
export const remove = (req, res) => res.send('Remove delete');
export const getUpload = (req, res) =>
  res.render('upload', { pageTitle: `Uploading Video` });
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    //can do new Video() or Video.create()
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(',').map((n) => `#${n.trim()}`),
    });
    // const video = new Video({
    //   title,
    //   description,
    //   createdAt: Date.now(),
    //   hashtags: hashtags.split(',').map((n) => `#${n.trim()}`),
    //   meta: {
    //     views: 0,
    //     rating: 0,
    //   },
    // });
    //  const dbVideo = await video.save();
    return res.redirect(`/`);
  } catch (error) {
    const errorMsg = error._message;
    return res.render('upload', {
      pageTitle: `Uploading Video`,
      error: errorMsg,
    });
  }
};
