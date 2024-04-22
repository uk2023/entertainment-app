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
    fetchTVData();
  }, []);

  const fetchTVData = async () => {
    try {
      const response = await fetch(`/api/tv`);
      const data = await response.json();
      setTVData(data);
    } catch (error) {
      console.error('Error fetching TV data:', error);
    }
  };

  const handleSearch = async (searchQuery) => {
    try {
      const searchResponse = await fetch('/api/tv/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });
      const searchData = await searchResponse.json();
      setSearchResults(searchData);
      setIsSearching(true);
    } catch (error) {
      console.error('Error searching TV shows:', error);
    }
  };


  const handleCardClick = async (tv) => {
    try {
      const detailsResponse = await fetch(`/api/tv/${tv.id}`);
      const detailsData = await detailsResponse.json();
    
      setSelectedTV(detailsData);
    } catch (error) {
      console.error('Error fetching TV show details:', error);
    }
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
