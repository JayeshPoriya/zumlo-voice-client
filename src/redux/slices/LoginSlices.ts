const { createSlice } = require('@reduxjs/toolkit');

const LoginSlices = createSlice({
  name: 'login',
  initialState: {
    productsList: [],
  },
  reducers: {
    storeProductsList(state, actions) {
      state.productsList = actions.payload;
    },
    clearProductsList(state, actions) {
      state.productsList = [];
    },
  },
});

export const { storeProductsList, clearProductsList } = LoginSlices.actions;
export default LoginSlices.reducer;
