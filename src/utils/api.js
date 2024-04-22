import fetch from 'node-fetch';

const API_KEY = '2e156bfbafb2b80aff6215674fa06522';

// Fetch Trending Data
export const fetchTrendingData = async () => {
  try {
    const trendingResponse = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`
    );
    if (!trendingResponse.ok) {
      throw new Error('Failed to fetch trending data');
    }
    const trendingData = await trendingResponse.json();
    return trendingData.results;
  } catch (error) {
    console.error('Error fetching trending data:', error.message);
    return [];
  }
};

// Fetch Recommended Data
export const fetchRecommendedData = async () => {
  try {
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!movieResponse.ok) {
      throw new Error('Failed to fetch recommended movies');
    }
    const movieData = await movieResponse.json();

    const tvResponse = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!tvResponse.ok) {
      throw new Error('Failed to fetch recommended TV shows');
    }
    const tvData = await tvResponse.json();

    const combinedData = [...movieData.results, ...tvData.results];
    return combinedData;
  } catch (error) {
    console.error('Error fetching recommended data:', error.message);
    return [];
  }
};
