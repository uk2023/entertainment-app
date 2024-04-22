import connectDB from '../../utils/db'; // Import database connection

// Connect to MongoDB
connectDB();

// Handler function for the API route
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch popular movies from TMDB API
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=2e156bfbafb2b80aff6215674fa06522`
      );
      const data = await response.json();

      res.status(200).json(data.results);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    // Handle movie search
    const { searchQuery } = req.body;

    try {
      // Adjust the API endpoint for movie search
      const searchResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=2e156bfbafb2b80aff6215674fa06522&query=${encodeURIComponent(
          searchQuery
        )}`
      );
      const searchData = await searchResponse.json();

      res.status(200).json(searchData.results);
    } catch (error) {
      console.error('Error searching movies:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
