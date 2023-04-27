export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = 'Wetube';
  res.locals.loggedInUser = req.session.user;
  return next();
};

export const protectUrlMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect('/login');
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
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
