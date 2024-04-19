import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTrendingData = createAsyncThunk(
  'movies/fetchTrendingData',
  async () => {
    const trendingResponse = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=2e156bfbafb2b80aff6215674fa06522`
    );
    const trendingData = await trendingResponse.json();
    return trendingData.results;
  }
);

export const fetchRecommendedData = createAsyncThunk(
  'movies/fetchRecommendedData',
  async () => {
    // Fetch and process recommended data here
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    trending: [],
    recommended: [],
    searchResults: [],
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingData.fulfilled, (state, action) => {
        state.trending = action.payload;
      })
      .addCase(fetchRecommendedData.fulfilled, (state, action) => {
        state.recommended = action.payload;
      });
  },
});

export const { setSearchResults } = movieSlice.actions;

export default movieSlice.reducer;
