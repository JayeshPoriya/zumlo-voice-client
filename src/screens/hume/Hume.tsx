// #region Imports
import React, { useState } from "react";
import {
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";
import images from "../../theme/Images";
import Header from "../../components/Header";
import Sound from "react-native-sound";
import { HUME } from "../../utils/Constants";

import RNFS from "react-native-fs";

import { Buffer } from "buffer";

if (typeof global.Buffer === "undefined") {
  global.Buffer = Buffer;
}

// #endregion Imports

const Hume: React.FC = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getHumeTTS = async (text: string) => {
    setLoading(true);
    console.log("getHumeTTS: text:", text);

    try {
      const response = await fetch("https://api.hume.ai/v0/tts/stream/file", {
        method: "POST",
        headers: {
          "X-Hume-Api-Key": HUME.API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          utterances: [
            {
              text,
              voice: {
                name: "Male English Actor",
                provider: "HUME_AI",
              },
            },
          ],
        }),
      });

      if (!response.ok) {
        console.log("TTS Error:", await response.text());
        setLoading(false);
        return;
      }

      // Read bytes directly
      const arrayBuffer = await response.arrayBuffer();

      // Convert binary → base64
      const base64Audio = Buffer.from(arrayBuffer).toString("base64");

      // Save file
      const path = `${RNFS.DocumentDirectoryPath}/hume_tts.wav`;
      await RNFS.writeFile(path, base64Audio, "base64");

      console.log("Audio saved:", path);

      // Play audio
      Sound.setCategory("Playback");
      const sound = new Sound(path, "", (err) => {
        if (err) {
          console.log("Sound Load Error:", err);
          return;
        }
        sound.play(() => sound.release());
      });
      setLoading(false);
    } catch (error) {
      console.log("TTS Exception:", error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Hume"
        showBack={true}
        onBackPress={() => navigation?.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={images.workInProgress} style={styles.logo} />

        <Text style={styles.heading}>Hume Text to Speech</Text>

        <Text style={styles.text}>
          Convert text to expressive speech using Hume's built-in voices.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => getHumeTTS(input)}
        >
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

export default Hume;
