import {useCallback, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

const usePermission = ({setIsInternetConnected}: any) => {
  const checkInterrnetConnection = useCallback(() => {
    const unsubscribe = NetInfo.addEventListener((currentState: any) => {
      setIsInternetConnected(currentState?.isConnected);
    });
    return unsubscribe;
  }, [setIsInternetConnected]);

  useEffect(() => {
    const unscribe: any = checkInterrnetConnection();
    return unscribe;
  }, [checkInterrnetConnection]);

  return {};
};

export default usePermission;
