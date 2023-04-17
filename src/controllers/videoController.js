export const trendingVideos = (req, res) => res.render('home');

export const see = (req, res) => {
  console.log(req.params);
  return res.render('watch');
};
export const edit = (req, res) => res.send('edit');
export const search = (req, res) => res.send('Search video');
export const remove = (req, res) => res.send('Remove delete');
export const upload = (req, res) => res.send('upload video');
