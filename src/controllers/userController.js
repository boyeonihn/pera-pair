import { User } from '../models/User';
export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
import bcrypt from 'bcrypt';

export const postJoin = async (req, res) => {
  const { email, name, password, location, passwordConfirm } = req.body;
  const emailExists = await User.exists({ email });
  const pageTitle = 'Join';
  if (emailExists) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: 'This email is already taken.',
    });
  } else if (password !== passwordConfirm) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: 'Passwords do not match. Please retype your password.',
    });
  }
  try {
    await User.create({
      email,
      password,
      location,
      name,
    });
    return res.redirect('/login');
  } catch (error) {
    const errorMsg = error._message;
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: errorMsg,
    });
  }
};

export const edit = (req, res) => res.send('Editing Profile');
export const remove = (req, res) => res.send('Delete User');
export const getLogin = (req, res) =>
  res.render('login', { pageTitle: 'Login' });
export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const pageTitle = 'Login';

  if (!user) {
    return res.status(400).render('login', {
      pageTitle,
      errorMessage: 'An account with this username does not exist',
    });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render('login', {
      pageTitle,
      errorMessage: 'Incorrect password',
    });
  }
  return res.redirect('/');
};
export const logout = (req, res) => res.send('Logout');
export const see = (req, res) => res.send('See Profile');
