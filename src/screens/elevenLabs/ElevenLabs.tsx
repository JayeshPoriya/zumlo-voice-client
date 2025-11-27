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
import { ELEVENLABS } from "../../utils/Constants";

import RNFS from "react-native-fs";

import { Buffer } from "buffer";
if (!global.Buffer) global.Buffer = Buffer;
// #endregion Imports

const ElevenLabs: React.FC = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getElevenLabsTTS = async (text: string) => {
    setLoading(true);

    try {
      const VOICE_ID = "6MoEUz34rbRrmmyxgRm4"; // Replace with your voice ID

      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": ELEVENLABS.API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.8,
            },
          }),
        }
      );

      if (!response.ok) {
        console.log("TTS Error:", await response.text());
        setLoading(false);
        return;
      }

      const arrayBuffer = await response.arrayBuffer();
      const base64Audio = Buffer.from(arrayBuffer).toString("base64");

      const path = `${RNFS.DocumentDirectoryPath}/elevenlabs_tts.mp3`;
      await RNFS.writeFile(path, base64Audio, "base64");

      console.log("Audio saved:", path);

      Sound.setCategory("Playback");
      const sound = new Sound(path, "", (err) => {
        if (err) {
          console.log("Sound Load Error:", err);
          return;
        }
        sound.play(() => sound.release());
      });

      setLoading(false);
    } catch (e) {
      console.log("TTS Exception:", e);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="ElevenLabs"
        showBack={true}
        onBackPress={() => navigation?.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={images.workInProgress} style={styles.logo} />

        <Text style={styles.heading}>ElevenLabs Text to Speech</Text>

        <Text style={styles.text}>
          Convert text to expressive speech using ElevenLabs's built-in voices.
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
          onPress={() => getElevenLabsTTS(input)}
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

export default ElevenLabs;
