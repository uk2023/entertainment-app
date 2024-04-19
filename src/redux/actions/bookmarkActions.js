// bookmarkActions.js

export const fetchBookmarks = () => {
  // Action logic to fetch bookmarks
  return async (dispatch) => {
    try {
      // Make an API request to fetch bookmarks
      const response = await fetch('/api/bookmarks');
      const data = await response.json();
      dispatch({ type: 'FETCH_BOOKMARKS_SUCCESS', payload: data.bookmarks });
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      dispatch({ type: 'FETCH_BOOKMARKS_FAILURE', payload: error.message });
    }
  };
};
// redux/actions/bookmarkActions.js

export const removeBookmark = (bookmarkId) => {
  return {
    type: 'REMOVE_BOOKMARK',
    payload: bookmarkId,
  };
};
