import React, {useCallback, useMemo, useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import Profile from '../../../modules/App/container/Profile';
import Home from '../../../modules/App/container/Home';

const Footer = () => {
  const [index, setIndex] = useState(1);
  const routes = [
    {
      key: 'home',
      focusedIcon: 'home-outline',
    },
    {key: 'event', focusedIcon: 'plus'},
    {key: 'recents', focusedIcon: 'menu'},
    {
      key: 'profile',
      focusedIcon: 'account-circle-outline',
    },
  ];

  const renderScene = useMemo(
    () =>
      BottomNavigation.SceneMap({
        home: Home,
        event: Home,
        recents: Home,
        profile: Profile,
      }),
    [],
  );

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Footer;
