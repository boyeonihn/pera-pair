import mongoose, { model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: String,
});

userSchema.pre('save', async function () {
  console.log(this.password, 'before password');
  this.password = await bcrypt.hash(this.password, 5);
  console.log(this.password, 'hash password');
});
export const User = mongoose.model('User', userSchema);
