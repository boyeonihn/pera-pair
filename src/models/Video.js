import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    comments: Number,
    views: Number,
    rating: Number,
  },
});

export const Video = mongoose.model('Video', videoSchema);
