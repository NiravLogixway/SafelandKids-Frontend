import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function navigateToNestedScreen(
  tabName: string,
  screenName: string,
  params?: any,
) {
  navigationRef.current?.navigate(tabName, {
    screen: screenName,
    params,
  });
}
