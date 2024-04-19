import { createSlice } from '@reduxjs/toolkit';

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: [],
  reducers: {
    toggleBookmark: (state, action) => {
      const existingIndex = state.findIndex(bookmark => bookmark.id === action.payload.id);
      if (existingIndex !== -1) {
        state.splice(existingIndex, 1); // Remove if bookmark exists
      } else {
        state.push(action.payload); // Add if bookmark doesn't exist
      }
    },
  },
});

export const { toggleBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;