import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./Styles";
import images from "../../theme/Images";
import colors from "../../theme/Colors";
import Header from "../../components/Header";

const MoodTracker: React.FC = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Mood Tracker"
        showBack={true}
        onBackPress={() => navigation?.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={images.workInProgress} style={styles.logo} />

        <Text style={styles.heading}>Mood Tracker</Text>

        <Text style={styles.text}>
          Welcome to our application. hen you land on a sample web page or open
          an email template and see content beginning with "lorem ipsum," the
          page creator placed that apparent gibberish there on purpose.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoodTracker;
