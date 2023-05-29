import { User } from '../models/User';
import { Post } from '../models/Post';

export const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate('owner');

  if (!post) {
    return res.render('404', { pageTitle: 'Post Not Found' });
  }
  return res.render('posts/read', { pageTitle: `Post: ${post.title}`, post });
};
export const getCreate = (req, res) => {
  return res.render('posts/create', { pageTitle: 'Create a post' });
};

export const postCreate = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { title, topic, text },
    file,
  } = req;

  const post = await Post.create({
    title,
    topic,
    text,
    owner: _id,
    fileUrl: file.location,
  });

  const user = await User.findById(_id);
  user.posts.push(post._id);
  return res.redirect('/');
};
