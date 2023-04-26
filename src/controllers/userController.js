import { User } from '../models/User';
import bcrypt from 'bcrypt';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
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

  if (user.socialOnly) {
    return res.status(400).render('login', {
      pageTitle,
      errorMessage: 'Please login with your OAuth',
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render('login', {
      pageTitle,
      errorMessage: 'Incorrect password.',
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect('/');
};

export const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid', { path: '/' });
  return res.redirect('/');
};

export const see = (req, res) => res.send('See Profile');

export const startGithubLogin = (req, res) => {
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: 'read:user user:email',
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/access_token';
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (
    await fetch(finalUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json();

  //above code same as this
  // const data = await fetch(finalUrl, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //   },
  // })
  // const json = await data.json();
  // if using this commented out code besure to make sure you're using
  //correct variable name for 'tokenRequest' when making the below fetch request

  if ('access_token' in tokenRequest) {
    // access api
    const { access_token } = tokenRequest;
    const apiUrl = 'https://api.github.com';
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        method: 'GET',
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        method: 'GET',
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailObject = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObject) {
      return res.redirect('/login');
    }

    let user = await User.findOne({ email: emailObject.email });
    if (!user) {
      user = await User.create({
        email: emailObject.email,
        avatarUrl: userData.avatar_url,
        password: '',
        location: userData.location,
        name: userData.name,
        socialOnly: true,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect('/');
  } else {
    return res.redirect('/login');
  }
};
