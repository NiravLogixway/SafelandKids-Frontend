import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import {navigate, goBack} from '@/navigation/NavigationService';

export const useTabNavigationGuard = () => {
  const currentKid = useSelector((state: RootState) => state.app.currentKid);

  const handleTabPress = useCallback(() => {
    if (currentKid) {
      navigate('Passcode', {kid: currentKid});
    }
  }, [currentKid]);

  const handleBackPress = useCallback(() => {
    if (currentKid) {
      navigate('Passcode', {kid: currentKid});
      return true; // Prevent default back behavior
    }
    return false; // Allow default back behavior
  }, [currentKid]);

  return {
    handleTabPress,
    handleBackPress,
    isChildMode: !!currentKid,
  };
};
