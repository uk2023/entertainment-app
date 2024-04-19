import React, { useState, useEffect } from 'react';
import './../styles/TV.css';
import './../app/globals.css';
import SearchBar from './SearchBar';
import VerticalBar from './VerticalBar';
import Modal from './Modal'; // Import your Modal component
import DetailedInfoComponent from './DetailedInfoComponent'; // Import your DetailedInfoComponent

const TV = () => {
  const [tvData, setTVData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTV, setSelectedTV] = useState(null);

  useEffect(() => {
    // Fetch popular TV shows from TMDB API when the component mounts
    const fetchTVData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=2e156bfbafb2b80aff6215674fa06522`
        );
        const data = await response.json();
        setTVData(data.results);
      } catch (error) {
        console.error('Error fetching TV data:', error);
      }
    };

    fetchTVData();
  }, []);

  const handleSearch = async (searchQuery) => {
    // Adjust the API endpoint for TV show search
    const searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=2e156bfbafb2b80aff6215674fa06522&query=${encodeURIComponent(
        searchQuery
      )}`
    );

    const searchData = await searchResponse.json();
    setSearchResults(searchData.results);
    setIsSearching(true);
  };
  const handleCardClick = async (tv) => {
    // Fetch detailed TV show information using the TV Show Details endpoint
    const detailsResponse = await fetch(
      `https://api.themoviedb.org/3/tv/${tv.id}?api_key=2e156bfbafb2b80aff6215674fa06522`
    );
    const detailsData = await detailsResponse.json();
  
    // Fetch TV show credits using the TV Show Credits endpoint
    const creditsResponse = await fetch(
      `https://api.themoviedb.org/3/tv/${tv.id}/credits?api_key=2e156bfbafb2b80aff6215674fa06522`
    );
    const creditsData = await creditsResponse.json();
  
    // Fetch TV show external IDs using the TV Show External IDs endpoint
    const externalIdsResponse = await fetch(
      `https://api.themoviedb.org/3/tv/${tv.id}/external_ids?api_key=2e156bfbafb2b80aff6215674fa06522`
    );
    const externalIdsData = await externalIdsResponse.json();
  
    // Merge the fetched data and set it in the state
    const detailedTVData = { ...detailsData, credits: creditsData, externalIds: externalIdsData };
    setSelectedTV(detailedTVData);
  };
  
  const handleCloseModal = () => {
    setSelectedTV(null);
  };

  return (
    <div className="tv-container">
      <VerticalBar />

      {/* SearchBar for TV Shows */}
      <SearchBar onSearch={handleSearch} placeholder="TV Series" mediaType="tv" />

      {/* TV Shows Section */}
      <div className="tv-section">
        <h2 className="tv-heading">{isSearching ? 'Search Results' : 'Popular TV Shows'}</h2>
        <div className="grid-container-tv">
          {isSearching
            ? // Display search results
              searchResults.map((show) => (
                <div key={show.id} className="tv-card" onClick={() => handleCardClick(show)}>
                  {/* Create an image element for the TV show poster */}
                  <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.name} />

                  {/* Overlay Section at the Bottom */}
                  <div className="overlay">
                    {/* TV Name */}
                    <h2 className="tv-name">{show.name}</h2>

                    {/* Details Row */}
                    <div className="details-row">
                      <div className="info">{`Release Year: ${show.first_air_date.slice(0, 4)}`}</div>
                      <div className="info">{`Content Rating: ${getRatingText(show.vote_average)}`}</div>
                    </div>
                  </div>
                </div>
              ))
            : // Display default TV series
              tvData.map((show) => (
                <div key={show.id} className="tv-card" onClick={() => handleCardClick(show)}>
                  {/* Create an image element for the TV show poster */}
                  <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.name} />

                  {/* Overlay Section at the Bottom */}
                  <div className="overlay">
                    {/* TV Name */}
                    <h2 className="tv-name">{show.name}</h2>

                    {/* Details Row */}
                    <div className="details-row">
                      <div className="info">{`Release Year: ${show.first_air_date.slice(0, 4)}`}</div>
                      <div className="info">{`Content Rating: ${getRatingText(show.vote_average)}`}</div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Modal for detailed information */}
      {selectedTV && (
        <Modal onClose={handleCloseModal}>
          {/* Detailed information component */}
          <DetailedInfoComponent tv={selectedTV} />
        </Modal>
      )}
    </div>
  );
};

// Function to get content rating based on vote average
const getRatingText = (voteAverage) => {
  if (voteAverage >= 18) {
    return '18+';
  } else if (voteAverage >= 14) {
    return 'PG';
  } else {
    return 'E';
  }
};

export default TV;
