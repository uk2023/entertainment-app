// controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const registerUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });
  return token;
};
