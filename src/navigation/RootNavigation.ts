// RootNavigation.js

import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: any) {
  console.log('Navigation Ready:', navigationRef.isReady()); // Debug log
  if (navigationRef.isReady()) {
    console.log('Current Navigation State:', navigationRef.getRootState());
    console.log(`Navigated to: ${name}`);
    navigationRef.navigate(name, params);
  }
}

export function reset() {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: 'List' }],
    });
  }
}
