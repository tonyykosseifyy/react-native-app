import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './reducers.js/themeSlice';


export default configureStore({
  reducer: {
    theme: themeSlice
  }
});

