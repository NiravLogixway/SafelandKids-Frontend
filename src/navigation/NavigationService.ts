import * as React from 'react';
import {NavigationContainerRef, CommonActions} from '@react-navigation/native';

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
  navigationRef.current?.dispatch(
    CommonActions.navigate({
      name: tabName,
      params: {
        screen: screenName,
        params,
      },
    }),
  );
}

export function resetToScreen(name: string, params: any) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name, params}],
  });
}

export function goBackWithDispatch() {
  if (navigationRef.current) {
    navigationRef.current.dispatch(CommonActions.goBack());
  }
}
