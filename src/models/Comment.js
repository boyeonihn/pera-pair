import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: { type: String, trim: true, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Video' },
});

export const Comment = mongoose.model('Comment', commentSchema);
