import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";
import images from "../../theme/Images";
import colors from "../../theme/Colors";
import {
  openAppSettingsForMicrophonePermission,
  requestMicrophonePermission,
} from "../../utils/GlobalFunctions";
import { useConversation } from "@elevenlabs/react-native";

const CommonButton = ({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: any;
  onPress?: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <View style={styles.buttonSubContainer}>
      <Text style={styles.buttonTitle}>{title}</Text>
      <Image source={icon} style={styles.buttonArrow} />
    </View>
  </TouchableOpacity>
);

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [connected, setConnected] = useState(false);
  const [listening, setListening] = useState(false);

  // Animated values
  const bgColor = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  // Animate background transitions
  const animateBackground = (toValue: number) => {
    Animated.timing(bgColor, {
      toValue,
      duration: 700,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  // Interpolated background color states
  const animatedBackground = bgColor.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [
      "#FFFFFF", // idle/disconnected
      "#E6F9E8", // connected
      "#DDEBFF", // listening
      "#F0E5FF", // responding
    ],
  });

  // Microphone Permission
  useEffect(() => {
    AskMicPermission();
  }, []);

  const AskMicPermission = async () => {
    const granted = await requestMicrophonePermission();
    if (!granted) {
      Alert.alert("Permission Required", "Microphone permission is needed.", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Open Settings",
          onPress: openAppSettingsForMicrophonePermission,
        },
      ]);
    }
  };

  // 🔊 Start wave loop when connected (Stop button visible)
  const startWave = () => {
    setListening(true);
    waveAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const stopWave = () => {
    setListening(false);
    waveAnim.stopAnimation();
    waveAnim.setValue(0);
  };

  // ElevenLabs Conversation Setup
  const convo = useConversation({
    onConnect: () => {
      setConnected(true);
      animateBackground(1);
      startWave();
    },
    onDisconnect: () => {
      setConnected(false);
      animateBackground(0);
      stopWave();
    },
    onMessage: (m) => {
      console.log("Message:", m);
      if (m.source === "user" && m.message) {
        animateBackground(2);
        handleVoiceCommand(m.message);
      }
      if (m.source === "ai" && m.message) {
        animateBackground(3);
        setTimeout(() => animateBackground(1), 2000);
      }
    },
    onError: (e) => console.error("Voice error:", e),
  });

  const start = async () => {
    await convo.startSession({ agentId: "agent_1901k9w36cgbfzvteggnhjzg4amd" });
  };

  const stop = async () => {
    await convo.endSession();
    animateBackground(0);
    stopWave();
  };

  const speak = async (text: string) => {
    try {
      await convo.sendUserMessage(text);
    } catch (e) {
      console.error("Error sending message:", e);
    }
  };

  const handleVoiceCommand = (text: string) => {
    const normalized = text.toLowerCase().trim();
    console.log("Voice Command:", normalized);

    if (normalized.includes("dashboard")) {
      navigation.navigate("Dashboard");
      speak("Opening your dashboard.");
    } else if (
      normalized.includes("journal") ||
      normalized.includes("journaling")
    ) {
      navigation.navigate("Journaling");
      speak("Let's begin journaling.");
    } else if (normalized.includes("goal") || normalized.includes("goals")) {
      navigation.navigate("Goals");
      speak("Here are your goals.");
    } else if (normalized.includes("plan") || normalized.includes("wellness")) {
      navigation.navigate("WellnessPlans");
      speak("Opening wellness plans.");
    } else if (normalized.includes("mood")) {
      navigation.navigate("MoodTracker");
      speak("Let's check your mood today.");
    } else {
      speak("Sorry, I didn’t understand that.");
    }

    setTimeout(() => animateBackground(1), 1000);
  };

  // Wave animation interpolation (only visible when connected)
  const waveSize = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [80, 160],
  });
  const waveOpacity = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: animatedBackground }]}
    >
      <SafeAreaView style={{ flex: 1 }}>
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

            {/* Navigation Buttons */}
            <CommonButton
              title="Dashboard"
              icon={images.back}
              onPress={() => navigation.navigate("Dashboard")}
            />
            <CommonButton
              title="Journaling"
              icon={images.back}
              onPress={() => navigation.navigate("Journaling")}
            />
            <CommonButton
              title="Goals"
              icon={images.back}
              onPress={() => navigation.navigate("Goals")}
            />
            <CommonButton
              title="Wellness Plans"
              icon={images.back}
              onPress={() => navigation.navigate("WellnessPlans")}
            />
            <CommonButton
              title="Mood Tracker"
              icon={images.back}
              onPress={() => navigation.navigate("MoodTracker")}
            />

            {/* Start / Stop Section */}
            <View style={styles.startStopContainer}>
              <Text style={styles.progress}>
                {connected ? "🎤 Connected" : "🔇 Disconnected"}
              </Text>

              {/* 🔵 Wave behind Stop Button */}
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                {connected && (
                  <Animated.View
                    style={[
                      styles.waveCircle,
                      {
                        width: waveSize,
                        height: waveSize,
                        opacity: waveOpacity,
                      },
                    ]}
                  />
                )}

                <TouchableOpacity
                  onPress={connected ? stop : start}
                  style={[
                    styles.startStopButton,
                    { backgroundColor: connected ? "#E57373" : "#81C784" },
                  ]}
                >
                  <Text style={styles.buttonTitle}>
                    {connected ? "Stop" : "Start"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Animated.View>
  );
};

export default Login;
