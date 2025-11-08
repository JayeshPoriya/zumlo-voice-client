import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";
import images from "../../theme/Images";
import colors from "../../theme/Colors";
import {
  openAppSettingsForMicrophonePermission,
  requestMicrophonePermission,
} from "../../utils/GlobalFunctions";

type CommonButtonProps = {
  title: string;
  icon: any; // or ImageSourcePropType
  onPress?: () => void;
};

const CommonButton = ({ title, icon, onPress }: CommonButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <View style={styles.buttonSubContainer}>
        <Text style={styles.buttonTitle}>{title}</Text>
        <Image source={icon} style={styles.buttonArrow} />
      </View>
    </TouchableOpacity>
  );
};

const Login: React.FC = ({ navigation }) => {
  useEffect(() => {}, []);

  useEffect(() => {
    console.log("useEffect AskMicPermission:");
    AskMicPermission();
  }, []);

  const AskMicPermission = async () => {
    const granted = await requestMicrophonePermission();
    console.log("AskMicPermission: granted: ", granted);

    if (granted) {
      // Alert.alert("Permission Granted", "Microphone access is enabled.");
    } else {
      Alert.alert("Permission Required", "Microphone permission is needed.", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Open Settings",
          onPress: openAppSettingsForMicrophonePermission,
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* App Logo */}
          <Image source={images.appLogo} style={styles.logo} />
          {/* Buttons */}
          <CommonButton
            title="Dashboard"
            icon={images.back}
            onPress={() => {
              navigation?.navigate("Dashboard");
            }}
          />

          <CommonButton
            title="Journaling"
            icon={images.back}
            onPress={() => {
              navigation?.navigate("Journaling");
            }}
          />

          <CommonButton
            title="Goals"
            icon={images.back}
            onPress={() => {
              navigation?.navigate("Goals");
            }}
          />

          <CommonButton
            title="Wellness Plans"
            icon={images.back}
            onPress={() => {
              navigation?.navigate("WellnessPlans");
            }}
          />

          <CommonButton
            title="Mood Tracker"
            icon={images.back}
            onPress={() => {
              navigation?.navigate("MoodTracker");
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
