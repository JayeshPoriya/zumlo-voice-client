const { createSlice } = require("@reduxjs/toolkit");

const DashboardSlices = createSlice({
  name: "dashboard",
  initialState: {
    test: [],
  },
  reducers: {
    storeTest(state, actions) {
      state.test = actions.payload;
    },
    clearTest(state, actions) {
      state.test = [];
    },
  },
});

export const { storeTest, clearTest } = DashboardSlices.actions;
export default DashboardSlices.reducer;
