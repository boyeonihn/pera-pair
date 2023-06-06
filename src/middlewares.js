import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: 'peraxpair',
  acl: 'public-read',
  key: function (request, file, ab_callback) {
    const newFileName = Date.now() + '-' + file.originalname;
    const fullPath = 'images/' + newFileName;
    ab_callback(null, fullPath);
  },
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: 'peraxpair',
  acl: 'public-read',
  key: function (request, file, ab_callback) {
    const newFileName = Date.now() + '-' + file.originalname;
    const fullPath = 'videos/' + newFileName;
    ab_callback(null, fullPath);
  },
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = 'petAmi';
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
  storage: s3ImageUploader,
});

export const uploadVideo = multer({
  dest: 'uploads/videos/',
  limits: {
    fileSize: 10000000,
  },
  storage: s3VideoUploader,
});

export const uploadPost = multer({
  dest: 'uploads/posts/',
  limits: {
    filSize: 10000000,
  },
  storage: s3ImageUploader,
});
