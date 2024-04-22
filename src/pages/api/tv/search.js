import fetch from 'node-fetch';

// Handler function for the API route
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle TV show search
    const { searchQuery } = req.body;

    try {
      // Adjust the API endpoint for TV show search
      const searchResponse = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=2e156bfbafb2b80aff6215674fa06522&query=${encodeURIComponent(
          searchQuery
        )}`
      );
      const searchData = await searchResponse.json();

      res.status(200).json(searchData.results);
    } catch (error) {
      console.error('Error searching TV shows:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
