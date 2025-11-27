// Styles.ts
import { StyleSheet } from "react-native";
import colors from "../../theme/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import fonts from "../../theme/Fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginTop: 30,
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 20,
    color: "#000",
  },

  text: {
    fontSize: 15,
    textAlign: "center",
    color: "#444",
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  input: {
    width: "100%",
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#f7f7f7",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#3A6FF8",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },

  title: { fontSize: 22, marginBottom: 20 },

  startBtn: { backgroundColor: "green" },
  stopBtn: { backgroundColor: "red" },
});

export default styles;
