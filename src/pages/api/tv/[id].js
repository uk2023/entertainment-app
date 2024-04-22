// api/tv/[id].js

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const detailsResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=2e156bfbafb2b80aff6215674fa06522`
      );
      const detailsData = await detailsResponse.json();
  
      const creditsResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=2e156bfbafb2b80aff6215674fa06522`
      );
      const creditsData = await creditsResponse.json();
  
      const externalIdsResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=2e156bfbafb2b80aff6215674fa06522`
      );
      const externalIdsData = await externalIdsResponse.json();
  
      const detailedTVData = { ...detailsData, credits: creditsData, externalIds: externalIdsData };
  
      res.status(200).json(detailedTVData);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
