import { User } from '../models/User';
export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });

export const postJoin = async (req, res) => {
  const { name, email, username, password, location } = req.body;

  await User.create({
    email,
    username,
    password,
    location,
    name,
  });
  return res.redirect('/login');
};

export const edit = (req, res) => res.send('Editing Profile');
export const remove = (req, res) => res.send('Delete User');
export const login = (req, res) => res.render('login', { pageTitle: 'Login' });
export const logout = (req, res) => res.send('Logout');
export const see = (req, res) => res.send('See Profile');
