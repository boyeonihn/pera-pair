import multer from 'multer';

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = 'peraXpair';
  res.locals.loggedInUser = req.session.user;
  return next();
};

export const protectUrlMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash('error', 'Please Login first.');
    return res.redirect('/login');
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash('error', 'Not authorized');
    return res.redirect('/');
  }
};

// to check if user's account is through social media
export const passwordsUsersOnlyMiddleware = (req, res, next) => {
  if (!req.session.user.socialOnly) {
    return next();
  } else {
    return res.redirect('/');
  }
};

export const uploadAvatar = multer({
  dest: 'uploads/avatars/',
  limits: {
    fileSize: 3000000,
  },
});

export const uploadVideo = multer({
  dest: 'uploads/videos/',
  limits: {
    fileSize: 10000000,
  },
});
