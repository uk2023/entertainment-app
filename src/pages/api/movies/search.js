import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { searchQuery } = req.body;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=2e156bfbafb2b80aff6215674fa06522&query=${encodeURIComponent(
        searchQuery
      )}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from TMDB API');
    }

    const searchData = await response.json();
    res.status(200).json(searchData.results);
  } catch (error) {
    console.error('Error searching movies:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
