// Import necessary modules
import { fetchTrendingData, fetchRecommendedData } from '../../utils/api'; // Import your API functions

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Fetch data
    const trendingData = await fetchTrendingData();
    const recommendedData = await fetchRecommendedData();

    res.status(200).json({
      trendingData,
      recommendedData,
    });
  } catch (error) {
    console.error('Error fetching home data:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
