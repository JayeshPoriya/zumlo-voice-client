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
    resizeMode: "contain",
  },
  buttonContainer: {
    backgroundColor: colors.themeColor,
    borderRadius: 5,
    margin: 10,
  },
  buttonSubContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  buttonTitle: {
    fontFamily: fonts.myFontBold,
    fontSize: wp("4%"),
    color: colors.white,
  },
  buttonArrow: {
    width: wp("5%"),
    height: wp("5%"),
    resizeMode: "contain",
    tintColor: colors.white,
    alignSelf: "center",
    transform: [{ rotate: "180deg" }],
  },
  startStopContainer: {
    // flex: 1,
    top: 50,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  startStopButton: {
    padding: 12,
    backgroundColor: colors.themeColor,
    borderRadius: 8,
  },
  progress: {
    fontFamily: fonts.myFontSemiBold,
    fontSize: wp("4%"),
    color: colors.black,
  },
});

export default styles;
