import DashboardSlices from "./slices/DashboardSlices";
import GoalsSlices from "./slices/GoalsSlices";
import JournalingSlices from "./slices/JournalingSlices";
import LoaderSlices from "./slices/LoaderSlices";
import LoginSlices from "./slices/LoginSlices";
import MoodTrackerSlices from "./slices/MoodTrackerSlices";
import WellnessPlansSlices from "./slices/WellnessPlansSlices";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    loader: LoaderSlices,
    login: LoginSlices,
    dashboard: DashboardSlices,
    goals: GoalsSlices,
    journaling: JournalingSlices,
    moodTracker: MoodTrackerSlices,
    wellnessPlans: WellnessPlansSlices,
  },
});
