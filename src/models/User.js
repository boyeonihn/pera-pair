import mongoose, { model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  password: String,
  name: { type: String, required: true },
  socialOnly: { type: Boolean, default: false },
  location: String,
});

userSchema.pre('save', async function () {
  console.log(this.password, 'before password');
  this.password = await bcrypt.hash(this.password, 5);
  console.log(this.password, 'hash password');
});
export const User = mongoose.model('User', userSchema);
