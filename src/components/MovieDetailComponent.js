// MovieDetailComponent.js

import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import LinkIcon from '@mui/icons-material/Link';
import './../styles/MovieDetailComponent.css'; // Import your MovieDetailComponent.css file

const MovieDetailComponent = ({ movie }) => {
  const [genres, setGenres] = useState([]);
  const [status, setStatus] = useState('');
  const [length, setLength] = useState('N/A');
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = '2e156bfbafb2b80aff6215674fa06522'; // Replace 'YOUR_API_KEY' with your actual TMDB API key

        // Fetch genres
        const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
        if (!genreResponse.ok) {
          throw new Error('Failed to fetch genres');
        }
        const genreData = await genreResponse.json();
        const genresMap = new Map(genreData.genres.map(genre => [genre.id, genre.name]));
        setGenres(movie.genre_ids.map(id => genresMap.get(id) || 'Unknown'));

        // Fetch movie details
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);
        if (!movieResponse.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const movieData = await movieResponse.json();
        setStatus(movieData.status || 'N/A');
        setLength(movieData.runtime ? `${movieData.runtime} min` : 'N/A');

        // Fetch cast
        const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`);
        if (!castResponse.ok) {
          throw new Error('Failed to fetch cast');
        }
        const castData = await castResponse.json();
        setCast(castData.cast);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movie.id, movie.genre_ids]);


  return (
    <div className="movie-detail-container">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
        className="backdrop-image"
      />

      <div className="details-content">
        <h2>{movie.title}</h2>

        <div className="info-row">
          <div className="info-rating">
            <p style={{ fontSize: '32px' }}>{`${(movie.vote_average / 2).toFixed(1)}`}</p>
            <div className="star-rating">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className={`star-icon ${index + 1 <= Math.round(movie.vote_average / 2) ? 'filled' : ''}`}
                  style={{ color: index + 1 <= Math.round(movie.vote_average / 2) ? '#FFD700' : '#B0B0B0' }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="top-info-row">
          <div className="top-info">
            <div>
              <p className="label">Year</p>
              <p className="response">{movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</p>
            </div>
            <div>
              <p className="label">Language</p>
              <p className="response">{movie.original_language}</p>
            </div>
            <div>
              <p className="label">Length</p>
              <p className="response">{length}</p>
            </div>
            <div>
              <p className="label">Status</p>
              <p className="response">{status || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="genres-box">
          <p className="title">Genres</p>
          <div className="genres-list">
            {genres && genres.length > 0 ? (
              genres.map((genre, index) => (
                <button className="genre-button" key={index}>
                  {genre}
                </button>
              ))
            ) : (
              <p>Genres: N/A</p>
            )}
          </div>
        </div>

        <div className="synopsis">
          <p className="title">Synopsis</p>
          <div className="synopsis-content">
            <p>{movie.overview || 'N/A'}</p>
          </div>
        </div>

        <div className="cast-box">
          <p className="title">Casts</p>
          <div className="cast-list">
            {cast && cast.length > 0 ? (
              cast.map((actor, index) => (
                <button className="cast-button" key={index}>
                  {actor.name}
                </button>
              ))
            ) : (
              <p>Cast: N/A</p>
            )}
          </div>
        </div>

        <div className="info-1">
          <button className="website-button" disabled>
            Website <LinkIcon style={{ marginLeft: '5px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailComponent;
