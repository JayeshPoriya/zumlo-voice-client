import LoaderSlices from './slices/LoaderSlices';
import LoginSlices from './slices/LoginSlices';

const { configureStore } = require('@reduxjs/toolkit');

export const store = configureStore({
  reducer: {
    loader: LoaderSlices,
    login: LoginSlices,
  },
});
