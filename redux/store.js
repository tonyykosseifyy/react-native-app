import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './reducers/themeSlice';


export default configureStore({
  reducer: {
    theme: themeSlice
  }
});

