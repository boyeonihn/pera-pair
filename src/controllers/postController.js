import { User } from '../models/User';
import { Post } from '../models/Post';
import { PostComment } from '../models/PostComment';

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

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    return res.sendStatus(404);
  }
  return res.render('posts/edit', { pageTitle: 'Edit Post', post });
};

export const postEdit = (req, res) => {
  return res.end();
};

export const registerPostView = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    return res.sendStatus(404);
  }
  post.meta.views += 1;
  await post.save();
  return res.sendStatus(200);
};

export const createPostComment = async (req, res) => {
  const {
    body: { text },
    session: {
      user: { _id },
    },
    params: { id },
  } = req;

  try {
    const post = await Post.findById(id);
    const user = await User.findById(_id);

    console.log('user is', user);
    console.log('post is', post);

    if (!post) {
      return res.sendStatus(404);
    }

    const newComment = await PostComment.create({
      text,
      owner: _id,
      post: id,
    });

    post.comments.push(newComment._id);
    post.save();
    user.postComments.push(newComment._id);
    user.save();

    return res.status(201).json({ newCommentId: newComment._id });
  } catch (error) {
    const errorMsg = error._message;
    return res.status(400).render('posts/read', {
      pageTitle: `Read`,
      error: errorMsg,
    });
  }
};

export const deletePostComment = async (req, res) => {
  const {
    body: { id },
    session: {
      user: { _id: userId },
    },
    params: { id: postId },
  } = req;

  const post = await Post.findById(postId);
  if (!post) {
    return res.sendStatus(404);
  }
  post.comments = post.comments.filter((comment) => comment !== id);
  post.save();
  await PostComment.findByIdAndDelete(id);
  console.log('SUCCESS');
  return res.sendStatus(200);
};
