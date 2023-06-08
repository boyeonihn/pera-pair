import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  text: { type: String, trim: true, required: true },
  topic: { type: String, required: true },
  fileUrl: { type: String, default: '' },
  date: { type: String, default: '' },
  time: { type: String, default: '' },
  endDate: { type: String, default: '' },
  location: { type: String, default: '' },
  createdAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  meta: {
    comments: { type: Number, default: 0, required: true },
    views: { type: Number, default: 0, required: true },
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'PostComment',
    },
  ],
});

export const Post = mongoose.model('Post', postSchema);
