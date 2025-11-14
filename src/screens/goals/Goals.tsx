// #region Imports
import React from "react";
import { Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";
import images from "../../theme/Images";
import Header from "../../components/Header";
// #endregion Imports

const Goals: React.FC = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Goals"
        showBack={true}
        onBackPress={() => navigation?.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={images.workInProgress} style={styles.logo} />
        <Text style={styles.heading}>Goals</Text>
        <Text style={styles.text}>
          Welcome to our application. hen you land on a sample web page or open
          an email template and see content beginning with "lorem ipsum," the
          page creator placed that apparent gibberish there on purpose.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Goals;
