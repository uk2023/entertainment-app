// components/BookmarkButton.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { saveBookmark } from '../slices/bookmarksSlice';

const BookmarkButton = ({ bookmarkData }) => {
  const dispatch = useDispatch();

  const handleBookmarkSave = () => {
    dispatch(saveBookmark(bookmarkData));
  };

  return (
    <button onClick={handleBookmarkSave}>Save Bookmark</button>
  );
};

export default BookmarkButton;
