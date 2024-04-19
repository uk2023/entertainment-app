// Movies.js

import React, { useState, useEffect } from 'react';
import VerticalBar from './VerticalBar'; // Adjust the path based on your project structure
import SearchBar from './SearchBar'; // Import the SearchBar component
import Modal from './Modal'; // Import the Modal component
import MovieDetailComponent from './MovieDetailComponent'; // Import the MovieDetailComponent
import './../app/globals.css';
import './../styles/Movies.css'; // Create a new CSS file for Movies component styles

const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch popular movies from TMDB API
    const fetchMoviesData = async () => {
      try {
        const moviesResponse = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=2e156bfbafb2b80aff6215674fa06522`
        );
        const moviesData = await moviesResponse.json();
        setMoviesData(moviesData.results);
      } catch (error) {
        console.error('Error fetching movies data:', error);
      }
    };

    fetchMoviesData();
  }, []);

  const handleSearch = async (searchQuery) => {
    // Adjust the API endpoint for movie search
    const searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=2e156bfbafb2b80aff6215674fa06522&query=${encodeURIComponent(
        searchQuery
      )}`
    );

    const searchData = await searchResponse.json();
    setSearchResults(searchData.results);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movies-container">
      <VerticalBar />
      {/* Movies Section */}
      {/* SearchBar for Movies */}
      <SearchBar onSearch={handleSearch} placeholder="Movies" mediaType="movies" />

      <div className="movies-section">
        <h2 className="movies-heading">Popular Movies</h2>
        <div className="grid-container">
          {(searchResults.length > 0 ? searchResults : moviesData).map((movie) => {
            const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

            return (
              <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
                {/* Display relevant information for each movie */}
                <img src={imageUrl} alt={movie.title} />
                <div className="overlay">
                  <div className="details-row">
                    <p className="info1">{movie.release_date?.substring(0, 4)}</p>
                    <p className="info">HD</p>
                    <p className="info">{movie.adult ? '18+' : 'PG'}</p>
                  </div>
                  <h3 className="movie-name">{movie.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for detailed information */}
      {selectedMovie && (
        <Modal onClose={handleCloseModal}>
          {/* Detailed information component */}
          <MovieDetailComponent movie={selectedMovie} />
        </Modal>
      )}
    </div>
  );
};

export default Movies;
