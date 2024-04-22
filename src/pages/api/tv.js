// pages/api/tv.js

import connectDB from '../../utils/db'; // Import database connection
import User from '../../models/User'; // Import User model
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

// Connect to MongoDB
connectDB();

// Handler function for the API route
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch popular TV shows from TMDB API
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=2e156bfbafb2b80aff6215674fa06522`
      );
      const data = await response.json();

      res.status(200).json(data.results);
    } catch (error) {
      console.error('Error fetching popular TV shows:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
