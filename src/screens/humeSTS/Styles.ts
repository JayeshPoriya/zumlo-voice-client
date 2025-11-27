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
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 40,
    tintColor: colors.themeColor,
  },
  heading: {
    fontSize: 20,
    fontFamily: fonts.myFontBold,
    color: colors.black,
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 16,
    fontFamily: fonts.myFontSemiBold,
    color: colors.black,
    marginTop: 16,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.myFontRegular,
    color: colors.grayDark,
    lineHeight: 20,
  },
  emotionContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 16,
  },

  emotionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  emotionLabel: {
    width: 100,
    fontSize: 14,
    color: "#444",
  },

  emotionBarBg: {
    flex: 1,
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginHorizontal: 10,
  },

  emotionBarFill: {
    height: 10,
    backgroundColor: "#7A5AF8",
    borderRadius: 5,
  },

  emotionValue: {
    width: 40,
    textAlign: "right",
  },

  wave: {
    backgroundColor: "#7A5AF8",
    width: "70%",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 30,
  },

  startButton: {
    backgroundColor: "#7A5AF8",
    paddingVertical: 14,
    borderRadius: 30,
    alignSelf: "center",
    paddingHorizontal: 30,
    marginTop: 20,
  },

  stopButton: {
    backgroundColor: "#F54C4C",
    paddingVertical: 14,
    borderRadius: 30,
    alignSelf: "center",
    paddingHorizontal: 30,
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
