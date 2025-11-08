const { createSlice } = require("@reduxjs/toolkit");

const WellnessPlansSlices = createSlice({
  name: "wellnessPlans",
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

export const { storeTest, clearTest } = WellnessPlansSlices.actions;
export default WellnessPlansSlices.reducer;
