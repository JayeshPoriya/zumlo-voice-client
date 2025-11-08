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
    backgroundColor: colors.themeColor,
    alignItems: "center",
    justifyContent: "center",
  },
  appLogo: {
    width: wp("50%"),
    height: wp("50%"),
  },
  appTitle: {
    fontFamily: fonts.myFontBold,
    fontSize: wp("10%"),
    color: colors.white,
    margin: 30,
  },
});

export default styles;
