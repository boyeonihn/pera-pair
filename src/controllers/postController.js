export const getPost = (req, res) => {
  return res.render('posts/read', { pageTitle: 'Post' });
};
export const getCreate = (req, res) => {
  return res.render('posts/create', { pageTitle: 'Create a post' });
};

