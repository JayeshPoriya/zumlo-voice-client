// import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';

// export const requestCameraPermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Camera Permission',
//           message: 'This app needs camera access to take photos.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   }
//   return true; // iOS permissions are handled automatically.
// };

// export const openAppSettingsForCameraPermission = () => {
//   Alert.alert(
//     'Permission Required',
//     'Camera permission is required to take photos. Please enable it in app settings.',
//     [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Open Settings',
//         onPress: () => {
//           Linking.openSettings().catch(() => {
//             Alert.alert('Error', 'Unable to open settings.');
//           });
//         },
//       },
//     ],
//   );
// };

import { Alert, Linking, Platform } from "react-native";
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";

// CAMERA
export const requestCameraPermission = async () => {
  const permission =
    Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

  const result = await request(permission);

  return result === RESULTS.GRANTED;
};

export const openAppSettingsForCameraPermission = () => {
  Alert.alert(
    "Permission Required",
    "Camera permission is required. Please enable it in app settings.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Open Settings",
        onPress: () => {
          openSettings().catch(() => {
            Alert.alert("Error", "Unable to open app settings.");
          });
        },
      },
    ]
  );
};

// MICROPHONE
export const requestMicrophonePermission = async () => {
  const permission =
    Platform.OS === "ios"
      ? PERMISSIONS.IOS.MICROPHONE
      : PERMISSIONS.ANDROID.RECORD_AUDIO;

  const result = await request(permission);
  console.log("requestMicrophonePermission: result: ", result);

  return result === RESULTS.GRANTED;
};

export const openAppSettingsForMicrophonePermission = () => {
  Alert.alert(
    "Permission Required",
    "Microphone permission is required for speech input. Please enable it in app settings.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Open Settings",
        onPress: () => {
          openSettings().catch(() => {
            Alert.alert("Error", "Unable to open app settings.");
          });
        },
      },
    ]
  );
};
