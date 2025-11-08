import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StatusBar,
} from 'react-native';
import images from '../theme/Images';
import colors from '../theme/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fonts from '../theme/Fonts';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  showRightCustom?: boolean;
  rightIcon?: ImageSourcePropType; // 👈 New: Pass your own icon
  onRightCustomButtonPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  showRightCustom = false,
  rightIcon = images.plus, // 👈 Default to plus
  onRightCustomButtonPress,
}) => {
  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity onPress={onBackPress} style={styles.backBtn}>
          <Image source={images.back} style={styles.backIcon} />
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{title}</Text>

      {showRightCustom && (
        <TouchableOpacity
          onPress={onRightCustomButtonPress}
          style={styles.customBtn}
        >
          <Image source={rightIcon} style={styles.customIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    padding: 20,
    // height: hp('10%'),
    width: wp('100%'),
    backgroundColor: colors.headerColor,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray,
  },
  backBtn: {
    padding: 8,
    width: wp('10%'),
    height: wp('10%'),
    justifyContent: 'center',
  },
  backIcon: {
    width: wp('5%'),
    height: wp('5%'),
    tintColor: colors.white,
  },
  title: {
    fontSize: wp('7%'),
    color: colors.white,
    fontFamily: fonts.myFontBold,
  },
  customBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
  },
  customIcon: {
    tintColor: colors.white,
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'contain',
  },
});
