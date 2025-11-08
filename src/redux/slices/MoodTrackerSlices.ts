const { createSlice } = require("@reduxjs/toolkit");

const MoodTrackerSlices = createSlice({
  name: "moodTracker",
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

export const { storeTest, clearTest } = MoodTrackerSlices.actions;
export default MoodTrackerSlices.reducer;
