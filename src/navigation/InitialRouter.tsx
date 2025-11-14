import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/splash/Splash";
import Login from "../screens/login/Login";
import Dashboard from "../screens/dashboard/Dashboard";
import Journaling from "../screens/journaling/Journaling";
import Goals from "../screens/goals/Goals";
import WellnessPlans from "../screens/wellnessPlans/WellnessPlans";
import MoodTracker from "../screens/moodTracker/MoodTracker";
import EmotiveChat from "../screens/emotiveChat/EmotiveChat";

const Stack = createNativeStackNavigator();

const InitialRouter = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Journaling"
        component={Journaling}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Goals"
        component={Goals}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WellnessPlans"
        component={WellnessPlans}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MoodTracker"
        component={MoodTracker}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EmotiveChat"
        component={EmotiveChat}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default InitialRouter;
