import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setUserData(data: any): Promise<void> {
  const stringValue = JSON.stringify(data);
  await AsyncStorage.setItem(`userData`, stringValue);
}

export async function getUserData(): Promise<string | null> {
  return AsyncStorage.getItem(`userData`);
}

export async function clearUserData(): Promise<void> {
  await AsyncStorage.removeItem(`userData`);
}

export async function setUserToken(token: string): Promise<void> {
  await AsyncStorage.setItem(`userToken`, token);
}

export async function getUserToken(): Promise<string | null> {
  return AsyncStorage.getItem(`userToken`);
}

export async function clearUserToken(): Promise<void> {
  await AsyncStorage.removeItem(`userToken`);
}

export async function setSessionId(sessionId: string): Promise<void> {
  await AsyncStorage.setItem(`sessionId`, sessionId);
}

export async function getSessionId(): Promise<string | null> {
  return AsyncStorage.getItem(`sessionId`);
}

export async function clearSessionId(): Promise<void> {
  await AsyncStorage.removeItem(`sessionId`);
}
