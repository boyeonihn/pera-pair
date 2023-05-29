import mongoose from 'mongoose';

const postCommentSchema = new mongoose.Schema({
  text: { type: String, trim: true, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
});

export const PostComment = mongoose.model('PostComment', postCommentSchema);
