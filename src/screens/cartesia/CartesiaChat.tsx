import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "./CartesiaStyles";
import { sendMessageToCartesia } from "./CartesiaApi";
import { generateTTS, playAudio } from "./CartesiaTTS";

const CartesiaChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      from: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    const userText = input;
    setInput("");

    // 🔥 TEXT REPLY
    const botReply = await sendMessageToCartesia(userText);

    const botMessage = {
      id: Date.now().toString() + "_bot",
      from: "bot",
      text: botReply,
    };

    setMessages((prev) => [...prev, botMessage]);

    // 🔥 VOICE REPLY
    const audioPath = await generateTTS(botReply);
    if (audioPath) {
      playAudio(audioPath);
    }
  };

  const renderItem = ({ item }) => (
    <View style={item.from === "user" ? styles.userBubble : styles.botBubble}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor="#666"
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartesiaChat;
