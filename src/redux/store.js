// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import bookmarkReducer from './slices/bookmarkSlice';
import movieDetailsReducer from './slices/movieDetailsSlice'; // Import movie details reducer
import categoriesReducer from './slices/categoriesSlice'; // Import categories reducer
import { combineReducers } from 'redux';

// Root reducer including the bookmarks reducer, movie details reducer, and categories reducer
const rootReducer = combineReducers({
  bookmarks: bookmarkReducer,
  movieDetails: movieDetailsReducer,
  categories: categoriesReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor
export const persistor = persistStore(store);

export default store;
