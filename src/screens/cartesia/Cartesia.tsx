// // import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   ScrollView,
//   Image,
// } from "react-native";
// import styles from "./Styles";

// import RNFS from "react-native-fs";
// import Sound from "react-native-sound";
// import { useState } from "react";
// import { CARTESIA } from "../../utils/Constants";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Header from "../../components/Header";
// import images from "../../theme/Images";

// const API_URL = "https://api.cartesia.ai/tts/bytes";
// const API_KEY = CARTESIA.API_KEY;

// const Cartesia = ({ navigation }) => {
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const generateTTS = async () => {
//     if (!text.trim()) return alert("Please enter text");

//     try {
//       setLoading(true);

//       const body = {
//         model_id: "sonic-3",
//         transcript: text,
//         voice: { mode: "id", id: "6ccbfb76-1fc6-48f7-b71d-91ac6298247b" },
//         output_format: {
//           container: "wav",
//           encoding: "pcm_f32le",
//           sample_rate: 44100,
//         },
//         speed: "normal",
//         generation_config: {
//           speed: 1,
//           volume: 1,
//         },
//       };

//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Cartesia-Version": "2025-04-16",
//           "X-API-Key": API_KEY,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       });

//       if (!response.ok) {
//         throw new Error("TTS failed");
//       }

//       const audioBytes = await response.arrayBuffer();
//       const filePath = `${RNFS.DocumentDirectoryPath}/tts.wav`;

//       // Save audio file
//       await RNFS.writeFile(
//         filePath,
//         Buffer.from(audioBytes).toString("base64"),
//         "base64"
//       );

//       // Play audio
//       const sound = new Sound(filePath, Sound.MAIN_BUNDLE, (err) => {
//         if (err) {
//           console.log("Audio error:", err);
//           return;
//         }
//         sound.play();
//       });

//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//       alert("Error generating audio");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header
//         title="Cartesia"
//         showBack={true}
//         onBackPress={() => navigation?.goBack()}
//       />
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Image source={images.workInProgress} style={styles.logo} />

//         <Text style={styles.heading}>Cartesia Text to Speech</Text>

//         <Text style={styles.text}>
//           Convert text to expressive speech using Cartesia's built-in voices.
//         </Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter text here..."
//           placeholderTextColor="#777"
//           multiline
//           value={text}
//           onChangeText={setText}
//         />

//         <TouchableOpacity style={styles.button} onPress={generateTTS}>
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Generate Speech</Text>
//           )}
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Cartesia;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";

import RNFS from "react-native-fs";
import Sound from "react-native-sound";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import images from "../../theme/Images";
import styles from "./Styles";
import { CARTESIA } from "../../utils/Constants";

// ⭐ FIX: Add Buffer polyfill for React Native
import { Buffer } from "buffer";
if (!global.Buffer) global.Buffer = Buffer;

const API_URL = "https://api.cartesia.ai/tts/bytes";
const API_KEY = CARTESIA.API_KEY;

const Cartesia = ({ navigation }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTTS = async () => {
    if (!text.trim()) return alert("Please enter text");

    try {
      setLoading(true);

      const body = {
        model_id: "sonic-3",
        transcript: text,
        voice: { mode: "id", id: "6ccbfb76-1fc6-48f7-b71d-91ac6298247b" },
        output_format: {
          container: "mp3",
          encoding: "mp3",
          sample_rate: 44100,
        },
        speed: "normal",
        generation_config: {
          speed: 1,
          volume: 1,
        },
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Cartesia-Version": "2025-04-16",
          "X-API-Key": API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.log("Cartesia Error:", await response.text());
        throw new Error("Cartesia TTS Failed");
      }

      // ⭐ Directly get raw bytes
      const audioBytes = await response.arrayBuffer();

      // ⭐ Convert to base64
      const base64Audio = Buffer.from(audioBytes).toString("base64");

      // ⭐ Save to local file
      const filePath = `${RNFS.DocumentDirectoryPath}/cartesia_tts.wav`;
      await RNFS.writeFile(filePath, base64Audio, "base64");

      console.log("Saved audio at:", filePath);

      // ⭐ Play audio (IMPORTANT: second argument must be "")
      const sound = new Sound(filePath, "", (err) => {
        if (err) {
          console.log("Audio load error:", err);
          return;
        }
        sound.play(() => sound.release());
      });

      setLoading(false);
    } catch (error) {
      console.log("Cartesia Error:", error);
      setLoading(false);
      alert("Failed to generate speech");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Cartesia"
        showBack={true}
        onBackPress={() => navigation?.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={images.workInProgress} style={styles.logo} />

        <Text style={styles.heading}>Cartesia Text to Speech</Text>

        <Text style={styles.text}>
          Convert text to expressive speech using Cartesia's voices.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter text here..."
          placeholderTextColor="#777"
          multiline
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity style={styles.button} onPress={generateTTS}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Generate Speech</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cartesia;
