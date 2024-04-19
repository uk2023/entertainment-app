// models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Define user schema fields
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add more fields as needed
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
