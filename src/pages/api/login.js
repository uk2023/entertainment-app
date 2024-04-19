// pages/api/login.js

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
      // Find the user by email in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare the password entered by the user with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Passwords match, so authentication successful
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).end(); // Method Not Allowed for other HTTP methods
}
