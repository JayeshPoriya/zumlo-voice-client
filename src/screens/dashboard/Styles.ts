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
});

export default styles;
