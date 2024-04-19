// DetailedInfoComponent.js

import React, { useState, useEffect } from 'react';
import './../styles/DetailedInfo.css'; // Import your DetailedInfo.css file
import StarIcon from '@mui/icons-material/Star'; // Import star icon from Material-UI
import LinkIcon from '@mui/icons-material/Link'; // Import link icon from Material-UI




const DetailedInfoComponent = ({ tv }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const apiKey = '2e156bfbafb2b80aff6215674fa06522'; // Replace 'YOUR_API_KEY' with your actual TMDb API key
        const response = await fetch(`https://api.themoviedb.org/3/tv/${tv.id}/credits?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cast data');
        }
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error('Error fetching cast data:', error);
      }
    };

    fetchCast();
  }, [tv.id]);

  return (
    <div className="detailed-info-container">
      <img
        src={`https://image.tmdb.org/t/p/original/${tv.backdrop_path}`}
        alt={tv.name}
        className="backdrop-image"
      />

      <div className="details-content">
        <h2>{tv.name}</h2>

        <div className="info-row">
        <div className="info-rating">
  <p style={{ fontSize: '32px' }}>{`${(tv.vote_average / 2).toFixed(1)}`}</p>
  <div className="star-rating">
    {Array.from({ length: 5 }).map((_, index) => (
      <StarIcon
        key={index}
        className={`star-icon ${index + 1 <= Math.round(tv.vote_average / 2) ? 'filled' : ''}`}
        style={{ color: index + 1 <= Math.round(tv.vote_average / 2) ? '#FFD700' : '#B0B0B0' }}
      />
    ))}
  </div>
</div>


         
        </div>

        <div className="top-info-row">
        <div className="top-info">
          <div>
            <p className="label">Language</p>
            <p className="response">{tv.original_language}</p>
          </div>
          <div>
            <p className="label">First Air Date</p>
            <p className="response">{tv.first_air_date}</p>
          </div>
          <div>
            <p className="label">Last Air Date</p>
            <p className="response">{tv.last_air_date}</p>
          </div>
          <div>
            <p className="label">Status:</p>
            <p className="response">{tv.status}</p>
          </div>
        </div>


        </div>

        

        <div className="genres-box">
          <p className="title">Genres</p>
          <div className="genres-list">
            {tv.genres && tv.genres.length > 0 ? (
              tv.genres.map((genre, index) => (
                <button className="genre-button" key={index}>
                  {genre.name}
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
            <p>{tv.overview || 'N/A'}</p>
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



        {/* Additional sections can be added based on the available properties in your TV show object */}
        {/* Example: Cast details, Additional Info, etc. */}
        <div className="info-1">
          <button className="website-button" disabled>
            Website <LinkIcon style={{ marginLeft: '5px' }} />
          </button>
        </div>



      </div>
    </div>
  );
};

export default DetailedInfoComponent;
