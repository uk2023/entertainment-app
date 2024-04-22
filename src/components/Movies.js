import React, { useState, useEffect } from 'react';
import VerticalBar from './VerticalBar';
import SearchBar from './SearchBar';
import Modal from './Modal';
import MovieDetailComponent from './MovieDetailComponent';
import './../app/globals.css';
import './../styles/Movies.css';

const Movies = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const fetchMoviesData = async () => {
    try {
      const moviesResponse = await fetch(`/api/movies`);
      const moviesData = await moviesResponse.json();
      setMoviesData(moviesData);
    } catch (error) {
      console.error('Error fetching movies data:', error);
    }
  };

  const handleSearch = async (searchQuery) => {
    try {
      const searchResponse = await fetch('/api/movies/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });
  
      if (!searchResponse.ok) {
        throw new Error('Failed to search movies');
      }
  
      const searchData = await searchResponse.json();
      setSearchResults(searchData);
    } catch (error) {
      console.error('Error searching movies:', error.message);
    }
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
        <h2 className="movies-heading">{searchResults.length > 0 ? 'Search Results' : 'Popular Movies'}</h2>
        <div className="grid-container">
          {Array.isArray(searchResults) && searchResults.length > 0
            ? searchResults.map((movie) => {
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
              })
            : Array.isArray(moviesData) &&
              moviesData.map((movie) => {
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
