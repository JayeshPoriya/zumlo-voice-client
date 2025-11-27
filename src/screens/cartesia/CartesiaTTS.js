import RNFS from "react-native-fs";
import Sound from "react-native-sound";
import { Buffer } from "buffer";
import { CARTESIA } from "../../utils/Constants";

if (!global.Buffer) global.Buffer = Buffer;

export const generateTTS = async (text) => {
  try {
    const response = await fetch("https://api.cartesia.ai/tts/bytes", {
      method: "POST",
      headers: {
        "X-API-Key": CARTESIA.API_KEY,
        "Cartesia-Version": "2025-04-16",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_id: "sonic-3",
        transcript: text,
        voice: { mode: "id", id: "6ccbfb76-1fc6-48f7-b71d-91ac6298247b" },
        output_format: {
          container: "mp3",
          encoding: "mp3",
          sample_rate: 44100,
        },
      }),
    });

    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString("base64");

    const path = `${RNFS.DocumentDirectoryPath}/cartesia_reply.mp3`;

    await RNFS.writeFile(path, base64Audio, "base64");

    return path;
  } catch (e) {
    console.log("TTS ERROR:", e);
    return null;
  }
};

export const playAudio = (filePath) => {
  Sound.setCategory("Playback");

  const sound = new Sound(filePath, "", (err) => {
    if (err) {
      console.log("Playback error:", err);
      return;
    }
    sound.play(() => sound.release());
  });
};
