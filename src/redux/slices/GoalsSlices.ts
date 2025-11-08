const { createSlice } = require("@reduxjs/toolkit");

const GoalsSlices = createSlice({
  name: "goals",
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

export const { storeTest, clearTest } = GoalsSlices.actions;
export default GoalsSlices.reducer;
