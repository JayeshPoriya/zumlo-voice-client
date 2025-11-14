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
  chatContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  userBubble: {
    backgroundColor: colors.themeColor,
    borderRadius: 20,
    padding: 12,
    marginVertical: 2,
    maxWidth: wp("80%"),
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 12,
    marginVertical: 2,
    maxWidth: wp("80%"),
    borderBottomLeftRadius: 4,
  },
  userText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.myFontRegular,
  },
  botText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.myFontRegular,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: colors.gray,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    fontSize: 16,
    marginRight: 8,
    fontFamily: fonts.myFontRegular,
  },
  sendButton: {
    backgroundColor: colors.themeColor,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  thinkingContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 8,
  },
  avatarCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.themeColor,
    marginRight: 6,
  },
  thinkingText: {
    color: colors.blue,
    fontFamily: fonts.myFontSemiBold,
  },
  sendIcon: {
    width: 15,
    height: 15,
    tintColor: colors.white,
    marginLeft: 1,
    resizeMode: "contain",
    transform: [{ rotate: "180deg" }],
  },
});

export default styles;
