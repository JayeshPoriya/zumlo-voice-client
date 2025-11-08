import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../theme/Colors';
import fonts from '../theme/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyLoader = () => {
  const { isLoading } = useSelector(state => state.loader);

  if (!isLoading) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color={colors.black} />
        <Text style={styles.title}>Loading...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // optional dark background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    width: 150,
    alignItems: 'center',
    elevation: 5, // subtle shadow
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
    fontFamily: fonts.myFontSemiBold,
  },
});

export default MyLoader;
