const { createSlice } = require("@reduxjs/toolkit");

const JournalingSlices = createSlice({
  name: "journaling",
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

export const { storeTest, clearTest } = JournalingSlices.actions;
export default JournalingSlices.reducer;
