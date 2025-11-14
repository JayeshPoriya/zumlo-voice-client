// #region Imports
import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  LayoutAnimation,
  UIManager,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import styles from "./Styles";
import colors from "../../theme/Colors";
import images from "../../theme/Images";
// #endregion Imports

const { width, height } = Dimensions.get("window");

const RANDOM_REPLIES = [
  "That’s a beautiful thought!",
  "I feel you — sometimes silence says more.",
  "Let’s breathe for a second…",
  "Wow… tell me more about that.",
  "✨ That resonates deeply.",
  "I see what you mean — that’s powerful.",
  "Interesting… let’s explore that feeling together.",
  "You have a poetic way of expressing things!",
];

// Android LayoutAnimation setup
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Message {
  id: string;
  text: string;
  type: "user" | "bot";
}

// MessageBubble Component
const MessageBubble = memo(({ item }: { item: Message }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(
    new Animated.Value(item.type === "user" ? 40 : -40)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const isUser = item.type === "user";

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateX: slideAnim }],
        alignSelf: isUser ? "flex-end" : "flex-start",
        marginVertical: 6,
      }}
    >
      <View style={isUser ? styles.userBubble : styles.botBubble}>
        <Text style={isUser ? styles.userText : styles.botText}>
          {item.text}
        </Text>
      </View>
    </Animated.View>
  );
});

const EmotiveChat: React.FC = ({ navigation }: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [thinking, setThinking] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<Animated.FlatList>(null);

  useEffect(() => {
    if (thinking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [thinking]);

  // Handle Send
  const handleSend = useCallback(() => {
    if (inputText.trim().length === 0) return;

    LayoutAnimation.easeInEaseOut();
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      type: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setThinking(true);

    setTimeout(() => {
      const randomText =
        RANDOM_REPLIES[Math.floor(Math.random() * RANDOM_REPLIES.length)];
      const botMessage: Message = {
        id: Date.now().toString() + "_bot",
        text: randomText,
        type: "bot",
      };
      LayoutAnimation.easeInEaseOut();
      setMessages((prev) => [...prev, botMessage]);
      setThinking(false);
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 1500);
  }, [inputText]);

  // Parallax Setup
  const translateY = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -100],
    extrapolate: "clamp",
  });

  const translateX = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 50],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Parallax Background Layers */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: width * 2,
            height: height * 2,
            top: -height * 0.4,
            left: -width * 0.5,
            backgroundColor: "#ede9fe",
            borderRadius: width,
            opacity: 0.4,
          },
          {
            transform: [
              { translateY: Animated.divide(translateY, 1.2) },
              { translateX: Animated.divide(translateX, 1.3) },
              {
                scale: scrollY.interpolate({
                  inputRange: [0, 300],
                  outputRange: [1, 1.08],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          {
            position: "absolute",
            width: width,
            height: width,
            top: height * 0.2,
            left: width * 0.3,
            backgroundColor: colors.backgroundBubbleColor,
            borderRadius: width,
            opacity: 0.25,
          },
          {
            transform: [
              { translateY: Animated.multiply(translateY, 0.7) },
              { translateX: Animated.multiply(translateX, -0.5) },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          {
            position: "absolute",
            width: width * 1.2,
            height: width * 1.2,
            top: height * 0.6,
            left: -width * 0.6,
            backgroundColor: colors.backgroundBubbleColor,
            borderRadius: width,
            opacity: 0.15,
          },
          {
            transform: [
              { translateY: Animated.multiply(translateY, 0.5) },
              { translateX: Animated.multiply(translateX, 0.4) },
            ],
          },
        ]}
      />

      {/* #endregion Parallax Background */}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Header
          title="Emotive Chat"
          showBack={true}
          onBackPress={() => navigation?.goBack()}
        />

        <Animated.FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <MessageBubble item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />

        {/* Bot "thinking" pulse */}
        {thinking && (
          <View style={styles.thinkingContainer}>
            <Animated.View
              style={[
                styles.avatarCircle,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />
            <Text style={styles.thinkingText}>thinking...</Text>
          </View>
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            placeholder="Type something emotional..."
            placeholderTextColor={colors.gray}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Image
              source={images.back}
              style={styles.sendIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EmotiveChat;
