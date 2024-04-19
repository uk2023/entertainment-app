// SearchBar.js

import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './../styles/SearchBar.css';

const SearchBar = ({ onSearch, placeholder, mediaType }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // Handle empty search query if needed
      return;
    }

    // Pass the search query and media type to the parent component for processing
    onSearch(searchQuery, mediaType);
  };

  const handleKeyPress = (e) => {
    // Handle 'Enter' key press to initiate search
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <div className="search-icon" onClick={handleSearch}>
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder={`Search for ${placeholder}`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
