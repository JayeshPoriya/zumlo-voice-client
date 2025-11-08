import React, { useEffect } from "react";
import { Text, Image } from "react-native";
import styles from "./Styles";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../theme/Images";
import colors from "../../theme/Colors";

const Splash: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.appLogo} source={images.speak} />
      <Text style={styles.appTitle}>Zumlo</Text>
    </SafeAreaView>
  );
};

export default Splash;
