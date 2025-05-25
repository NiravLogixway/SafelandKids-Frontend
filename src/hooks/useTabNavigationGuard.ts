import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import {navigate} from '@/navigation/NavigationService';

export const useTabNavigationGuard = () => {
  const currentKid = useSelector((state: RootState) => state.app.currentKid);

  const handleTabPress = useCallback(() => {
    if (currentKid) {
      navigate('Passcode', {kid: currentKid});
    }
  }, [currentKid]);

  return {
    handleTabPress,
    isChildMode: !!currentKid,
  };
};
