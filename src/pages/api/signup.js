// pages/api/signup.js

import connectDB from '../../utils/db'; // Import database connection
import User from '../../models/User'; // Import User model
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

// Connect to MongoDB
connectDB();

// Handler function for the API route
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Check if user with the given email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user document
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      // Save the user document to the database
      await newUser.save();

      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).end(); // Method Not Allowed for other HTTP methods
}
