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

//Elevenlabs
import { useConversation } from "@elevenlabs/react-native";
import { ensureMicPermission } from "./ensureMicPermission";

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
  const [connected, setConnected] = useState(false);

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

  // Hook must be called here — top level, not inside conditions
  const convo = useConversation({
    onConnect: () => setConnected(true),
    onDisconnect: () => setConnected(false),
    onMessage: (m) => console.log("message: ", m),
    onError: (e) => console.error("voice error", e),
  });

  const start = async () => {
    await convo.startSession({ agentId: "agent_5101k9hm5jqgfhptbj2vdt1hwrs7" });
  };

  const stop = async () => {
    await convo.endSession();
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

          <View style={styles.startStopContainer}>
            <Text style={styles.progress}>
              {connected ? "Connected" : "Disconnected"}
            </Text>
            <TouchableOpacity
              onPress={connected ? stop : start}
              style={styles.startStopButton}
            >
              <Text style={styles.buttonTitle}>
                {connected ? "Stop" : "Start"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Alert,
//   Animated,
//   Easing,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import styles from "./Styles";
// import images from "../../theme/Images";
// import {
//   openAppSettingsForMicrophonePermission,
//   requestMicrophonePermission,
// } from "../../utils/GlobalFunctions";

// // ElevenLabs
// import { useConversation } from "@elevenlabs/react-native";

// // Intent/Emotion utils (your file)
// import {
//   detectEmotion,
//   detectNavigationIntent,
//   getCalmingVoiceResponse,
// } from "../../utils/VoiceIntent.util";

// type CommonButtonProps = {
//   title: string;
//   icon: any;
//   onPress?: () => void;
// };

// const CommonButton = ({ title, icon, onPress }: CommonButtonProps) => {
//   return (
//     <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
//       <View style={styles.buttonSubContainer}>
//         <Text style={styles.buttonTitle}>{title}</Text>
//         <Image source={icon} style={styles.buttonArrow} />
//       </View>
//     </TouchableOpacity>
//   );
// };

// const Login: React.FC<any> = ({ navigation }) => {
//   // --- UI state
//   const [connected, setConnected] = useState(false);

//   // --- animated background (0..1..2 based on emotion group)
//   const bgAnim = useRef(new Animated.Value(0)).current;

//   // map animated value to colors
//   const bgColor = useMemo(
//     () =>
//       bgAnim.interpolate({
//         inputRange: [0, 1, 2, 3],
//         outputRange: [
//           "#101828", // neutral (deep blue/grey)
//           "#1f2937", // sad
//           "#3b0764", // anxiety (violet-ish)
//           "#450a0a", // anger (deep red)
//         ],
//       }),
//     [bgAnim]
//   );

//   const animateForEmotion = (emotion: string) => {
//     // map emotion -> index in inputRange
//     const idx =
//       emotion === "sad"
//         ? 1
//         : emotion === "anxiety"
//         ? 2
//         : emotion === "anger"
//         ? 3
//         : 0;

//     Animated.timing(bgAnim, {
//       toValue: idx,
//       duration: 600,
//       easing: Easing.inOut(Easing.quad),
//       useNativeDriver: false, // color can't use native driver
//     }).start();
//   };

//   // --- mic permission once
//   useEffect(() => {
//     (async () => {
//       const granted = await requestMicrophonePermission();
//       if (!granted) {
//         Alert.alert("Permission Required", "Microphone permission is needed.", [
//           { text: "Cancel", style: "cancel" },
//           {
//             text: "Open Settings",
//             onPress: openAppSettingsForMicrophonePermission,
//           },
//         ]);
//       }
//     })();
//   }, []);

//   /**
//    * IMPORTANT: Call the hook exactly once at the top level.
//    * Do NOT wrap in if/try/catch/return early blocks.
//    */
//   const { startSession, endSession, state, sendUserInput } = useConversation({
//     onConnect: () => {
//       setConnected(true);
//       // small positive pulse on connect
//       animateForEmotion("neutral");
//     },
//     onDisconnect: () => {
//       setConnected(false);
//     },
//     onMessage: (m) => {
//       console.log("onMessage m:", m);

//       const text = (m?.text ?? "").toString().trim();
//       if (!text) return;

//       console.log("[Voice] Heard:", text);

//       // 1) Navigation intent?
//       const screen = detectNavigationIntent(text);
//       if (screen) {
//         // lead with a quick calming cue before navigate
//         animateForEmotion("neutral");
//         navigation?.navigate(screen);
//         return;
//       }

//       // 2) Emotion + calm reply
//       const emotion = detectEmotion(text);
//       animateForEmotion(emotion);

//       const reply = getCalmingVoiceResponse(emotion);

//       // If SDK exposes sendUserInput, use it to make the agent speak a reply.
//       // (Some versions might not expose this; we guard it.)
//       try {
//         if (typeof sendUserInput === "function") {
//           // The SDK expects a shape like { text: string }
//           sendUserInput({ text: reply });
//         } else {
//           console.log(
//             "[Voice] sendUserInput not available in this SDK version. Skipping voice reply."
//           );
//         }
//       } catch (e) {
//         console.warn("[Voice] sendUserInput failed:", e);
//       }
//     },
//     onError: (e) => {
//       console.error("[Voice] error", e);
//       // mild flash to neutral on errors
//       animateForEmotion("neutral");
//     },
//   });

//   const isConnected = state === "connected";
//   const isConnecting = state === "connecting";

//   const start = async () => {
//     try {
//       await startSession({ agentId: "agent_5101k9hm5jqgfhptbj2vdt1hwrs7" });
//     } catch (e) {
//       console.error("startSession failed:", e);
//       Alert.alert("Voice Session", "Unable to start voice session. See logs.");
//     }
//   };

//   const stop = async () => {
//     try {
//       await endSession();
//     } catch (e) {
//       console.error("endSession failed:", e);
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.container, { padding: 0 }]}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//       >
//         <Animated.View style={[{ flex: 1, backgroundColor: bgColor }]}>
//           <ScrollView
//             contentContainerStyle={styles.scrollContainer}
//             keyboardShouldPersistTaps="handled"
//           >
//             {/* App Logo */}
//             <Image source={images.appLogo} style={styles.logo} />

//             {/* Quick nav buttons (manual) */}
//             <CommonButton
//               title="Dashboard"
//               icon={images.back}
//               onPress={() => navigation?.navigate("Dashboard")}
//             />
//             <CommonButton
//               title="Journaling"
//               icon={images.back}
//               onPress={() => navigation?.navigate("Journaling")}
//             />
//             <CommonButton
//               title="Goals"
//               icon={images.back}
//               onPress={() => navigation?.navigate("Goals")}
//             />
//             <CommonButton
//               title="Wellness Plans"
//               icon={images.back}
//               onPress={() => navigation?.navigate("WellnessPlans")}
//             />
//             <CommonButton
//               title="Mood Tracker"
//               icon={images.back}
//               onPress={() => navigation?.navigate("MoodTracker")}
//             />

//             {/* Voice controls */}
//             <View style={styles.startStopContainer}>
//               <Text style={styles.progress}>
//                 {isConnected
//                   ? "Connected"
//                   : isConnecting
//                   ? "Connecting..."
//                   : "Disconnected"}
//               </Text>

//               <TouchableOpacity
//                 onPress={isConnected ? stop : start}
//                 disabled={isConnecting}
//                 style={[
//                   styles.startStopButton,
//                   isConnecting && { opacity: 0.5 },
//                 ]}
//               >
//                 <Text style={styles.buttonTitle}>
//                   {isConnected
//                     ? "Stop"
//                     : isConnecting
//                     ? "Starting..."
//                     : "Start"}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </Animated.View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default Login;
