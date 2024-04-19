// slices/movieDetailsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState: {},
  reducers: {
    setMovieDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMovieDetails } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
