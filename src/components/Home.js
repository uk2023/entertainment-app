import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark } from '../redux/slices/bookmarkSlice';
import SearchBar from './SearchBar';
import axios from 'axios'; // Import Axios
import './../app/globals.css';
import './../styles/Home.css';
import VerticalBar from './VerticalBar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BookmarkIcon from '@mui/icons-material/Bookmark';


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);

  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks) || []; // Ensure bookmarks is an array


  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get('/api/home');
        const { trendingData, recommendedData } = response.data;
        setTrendingData(trendingData);
        setRecommendedData(recommendedData);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchHomeData();
  }, []);

  const getReleaseYearForTV = (firstAirDate) => firstAirDate?.substring(0, 4);

  const handleSearch = async (query) => {
    if (query.trim() === '') {
      return;
    }

    const searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=2e156bfbafb2b80aff6215674fa06522&query=${encodeURIComponent(
        query
      )}`
    );

    const searchData = await searchResponse.json();
    setSearchResults(searchData.results);
    setSearchQuery(query);
  };

  const handleBookmarkToggle = (item) => {
    dispatch(toggleBookmark(item));
  };

  return (
    <div className="home-container">
      <VerticalBar />
      <div className="search-home">
        <SearchBar onSearch={handleSearch} placeholder="Movies or TV Shows" mediaType={['movie', 'tv']} />
      </div>

      {searchResults.length > 0 && (
        <div className="search">
          <p className="search-result">{`Found ${searchResults.length} result${
            searchResults.length !== 1 ? 's' : ''
          } for '${searchQuery}'`}</p>
          <div className="horizontal-scroll-container">
            {searchResults.map((item) => (
              <div key={item.id} className="card-container">
                <div className="card">
                  <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
                </div>

                <div className="movie-info">
                  <div className="details-row">
                    <p className="info1">{item.release_date?.substring(0, 4)}</p>
                    <p className="info">{item.media_type}</p>
                    <p className="info">{item.adult ? '18+' : 'PG'}</p>
                  </div>
                  <h3>{item.title || item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults.length === 0 && (
        <div className="row">
          <div>
            <h2 className="title">Trending</h2>
          </div>
          <div className="horizontal-scroll-container">
            {trendingData.map((item) => (
              <div key={item.id} className="card">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
                <div className="overlay">
                  <div className="details-row">
                    <p className="info1">{item.release_date?.substring(0, 4)}</p>
                    <p className="info">{item.media_type}</p>
                    <p className="info">{item.adult ? '18+' : 'PG'}</p>
                  </div>
                  <div className="play-overlay">
                    <div className="play-button">
                      <PlayArrowIcon className="play-icon" />
                      Play
                    </div>
                  </div>
                  <BookmarkIcon
                    className="bookmark-icon"
                    onClick={() => handleBookmarkToggle(item)}
                    style={{ color: bookmarks.some((bookmark) => bookmark.id === item.id) ? 'blue' : 'black' }}
                  />
                  <h3>{item.title || item.name}</h3>
                </div>
              </div>
            ))}
          </div>

          <h2 className="title-1">Recommended For You</h2>
          <div className="grid-container">
            {recommendedData
              .filter((item) => item.original_name && item.first_air_date && item.vote_average)
              .map((item) => (
                <div key={item.id} className="card-container">
                  <div className="card-1">
                    <BookmarkIcon
                      className="bookmark-icon"
                      onClick={() => handleBookmarkToggle(item)}
                      style={{ color: bookmarks.some((bookmark) => bookmark.id === item.id) ? 'blue' : 'black' }}
                    />
                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.name} />
                  </div>
                  <div className="card-content-1">
                    <div className="details-row">
                      <p className="info1">{getReleaseYearForTV(item.first_air_date)}</p>
                      {item.original_language && item.original_language.toLowerCase() === 'en' ? (
                        <p className="info">TV Show</p>
                      ) : (
                        <p className="info">Movie</p>
                      )}
                    </div>
                    <h3>{item.original_name}</h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
