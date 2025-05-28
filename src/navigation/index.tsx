import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '@/modules/Auth/store/authActions';
import type { RootState } from '@/store';
import usePermission from '@/hooks/usePermission';
import InternetAccess from '@/component/app/InternetAccess';
import AppNavigator from './AppStack';
import AuthNavigator from './AuthStack';
import AuthLoader from '@/modules/Auth/screens/AuthLoader';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import { linking } from './linking';

const App: React.FC = () => {
  const [isInternetConnected, setIsInternetConnected] = useState(true);
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth?.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.auth?.loading);

  usePermission({ setIsInternetConnected });

  useEffect(() => {
    if (isInternetConnected) {
      setTimeout(() => {
        dispatch(getUserProfile());
      }, 2000);
    }
  }, [isInternetConnected]);

  if (isInternetConnected && false) {
    return <InternetAccess />;
  }

  if (isLoading) {
    return <AuthLoader />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      fallback={<AuthLoader />}
    >
      {isLogin ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;
