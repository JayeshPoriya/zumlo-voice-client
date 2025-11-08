import Toast from 'react-native-toast-message';

const showToast = (message: string) => {
  Toast.show({
    text1: message,
    position: 'bottom',
    visibilityTime: 2000,
    type: 'success',
  });
};

const showError = (message: string) => {
  Toast.show({
    text1: message,
    position: 'bottom',
    visibilityTime: 2000,
    type: 'error',
  });
};

const DisplayToast = {
  showToast,
  showError,
};

export default DisplayToast;
