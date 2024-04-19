import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBookmark } from '../redux/actions/bookmarkActions';
import Modal from './Modal';
import MovieDetailComponent from './MovieDetailComponent';
import DetailedInfoComponent from './DetailedInfoComponent'; // Assuming you have a component for TV show details
import SearchBar from './SearchBar';
import VerticalBar from './VerticalBar';
import './../styles/Bookmarks.css';

import './../app/globals.css';

const Bookmarks = () => {
  const bookmarks = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookmarkClick = (bookmark) => {
    setSelectedBookmark(bookmark);
    setIsModalOpen(true);
  };

  const handleRemoveBookmark = (bookmarkId) => {
    dispatch(removeBookmark(bookmarkId));
  };
  const movieBookmarks = bookmarks.filter((bookmark) => bookmark.media_type === 'movie');

  // Filter TV show bookmarks
  const tvShowBookmarks = bookmarks.filter((bookmark) => {
    return bookmark.first_air_date;
  });

  // Show an error message if TV show bookmarks are not found
  if (tvShowBookmarks.length === 0) {
    console.error('No TV show bookmarks found.');
  }

  console.log('TV Show Bookmarks:', tvShowBookmarks);
  console.log('Fetched Bookmarks:', bookmarks);
  console.log('Movie Bookmarks:', movieBookmarks);

  

  return (
    <div className="bookmarks-container">
      <div className='searchbar'>
        <SearchBar  placeholder="Bookmarked Movies or TV Series" mediaType="tv" />
      </div>
      <VerticalBar />
      

      <div className="bookmarks-section">
         {/* Modal for detailed information */}
         {isModalOpen && selectedBookmark && (
          <Modal onClose={() => setIsModalOpen(false)}>
            {/* Render MovieDetailComponent or DetailedInfoComponent based on the media type */}
            {selectedBookmark.media_type === 'movie' ? (
              <MovieDetailComponent movie={selectedBookmark} />
            ) : (
              <DetailedInfoComponent tvShow={selectedBookmark} />
            )}
          </Modal>
        )}
        <h2 className="bookmarks-heading">Bookmarked Movies</h2>
       
        <div className="grid-container-bookmarks">
          {/* Display movie bookmarks */}
          {bookmarks.map((bookmark) => {
            if (bookmark.media_type === 'movie') {
              return (
                <div key={bookmark.id} className="bookmark-card" onClick={() => handleBookmarkClick(bookmark)}>
                  <img src={`https://image.tmdb.org/t/p/w500${bookmark.poster_path}`} alt={bookmark.title} />
                  <div className="overlay">
                    <h2 className="bookmark-title">{bookmark.title}</h2>
                    <div className="bookmark-details">
                      <div className="info">{`Release Date: ${bookmark.release_date}`}</div>
                      <div className="info">{`Popularity: ${bookmark.popularity}`}</div>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveBookmark(bookmark.id)}>Remove Bookmark</button>
                </div>
              );
            }
            return null;
          })}
          
        </div>
        
      </div>

      

      <div className="bookmarks-section">
      <h2 className="bookmarks-heading">Bookmarked TV Shows</h2>
      <div className="grid-container-bookmarks">
        {tvShowBookmarks.map((bookmark) => (
          <div key={bookmark.id} className="bookmark-card" onClick={() => handleBookmarkClick(bookmark)}>
            <img src={`https://image.tmdb.org/t/p/w500${bookmark.backdrop_path}`} alt={bookmark.name} />
            <div className="overlay">
              <h2 className="bookmark-title">{bookmark.name}</h2>
              <div className="bookmark-details">
                <div className="info">{`First Air Date: ${bookmark.first_air_date}`}</div>
                <div className="info">{`Popularity: ${bookmark.popularity}`}</div>
              </div>
            </div>
            <button onClick={() => handleRemoveBookmark(bookmark.id)}>Remove Bookmark</button>
          </div>
        ))}
      </div>
      
      {/* Modal for detailed information */}
      {isModalOpen && selectedBookmark && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <DetailedInfoComponent tv={selectedBookmark} /> {/* Pass selected bookmark to DetailedInfoComponent */}
        </Modal>
      )}
    </div>

      
    </div>
  );
};

export default Bookmarks;
