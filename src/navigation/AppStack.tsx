import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useTabNavigationGuard } from '@/hooks/useTabNavigationGuard';
import { useDispatch } from 'react-redux';
import { getItem } from '@/utils/localstorage';
import { navigate } from './NavigationService';
import * as appActions from '@/modules/App/store/appActions';
import { bottomNavigationsTab } from './constants/tabMenus';

// Screens
import Home from '@/modules/App/screens/Home';
import Profile from '@/modules/App/screens/Profile';
import ChildForm from '@/modules/App/screens/Child/ChildForm';
import EditProfile from '@/modules/App/screens/Profile/EditProfile';
import AddChildPlaylists from '@/modules/App/screens/Child/AddChildPlaylists';
import ChildVideoPlayer from '@/modules/App/screens/Child/ChildVideoPlayer';
import ChildPlaylist, { VideoProps } from '@/modules/App/screens/Child/ChildPlaylist';
import Passcode from '@/modules/App/screens/Passcode';
import { Kid } from '@/modules/App/store/appTypes';
import { useTabContext } from '@/context/TabContext';
import { useThemeContext } from '@/context/ThemeContext';

// Tab/Stack Types
export type MainTab = { Home: undefined; Child: undefined; Profile: undefined; };
export type HomeStack = { ChildList: undefined; ChildVideoPlayer: { kid: Kid, video: VideoProps }; ChildVideoPlaylist: { kid: Kid }; Passcode: { kid: Kid } };
export type ChildStack = { ChildForm: { mode?: 'add' | 'edit'; kid?: Kid }; ChildPlaylist: undefined; };
export type ProfileStack = { Profile: undefined; EditProfile: undefined; };

const Tab = createBottomTabNavigator<MainTab>();
const HomeStack = createNativeStackNavigator<HomeStack>();
const ChildStack = createNativeStackNavigator<ChildStack>();
const ProfileStack = createNativeStackNavigator<ProfileStack>();

const HomeNav = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="ChildList" component={Home} />
    <HomeStack.Screen name="ChildVideoPlaylist" component={ChildPlaylist} initialParams={{ kid: undefined }} />
    <HomeStack.Screen name="ChildVideoPlayer" component={ChildVideoPlayer} initialParams={{ kid: undefined, video: undefined }} />
    <HomeStack.Screen name="Passcode" component={Passcode} initialParams={{ kid: undefined }} />
  </HomeStack.Navigator>
);

const ChildNav = () => (
  <ChildStack.Navigator screenOptions={{ headerShown: false }}>
    <ChildStack.Screen name="ChildForm" component={ChildForm} initialParams={{ mode: 'add', kid: undefined }} />
    <ChildStack.Screen name="ChildPlaylist" component={AddChildPlaylists} />
  </ChildStack.Navigator>
);

const ProfileNav = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Profile" component={Profile} />
    <ProfileStack.Screen name="EditProfile" component={EditProfile} />
  </ProfileStack.Navigator>
);

const getTabListeners = (isChildMode: boolean, handleTabPress: () => void) => ({
  tabPress: (e: any) => {
    if (isChildMode) {
      e.preventDefault();
      handleTabPress();
    }
  },
});

const AppNavigator: React.FC<{ screenOptions?: NativeStackNavigationOptions }> = (props) => {
  const dispatch = useDispatch();
  const { isTabBarVisible } = useTabContext();
  const { handleTabPress, isChildMode } = useTabNavigationGuard();
  const { theme } = useThemeContext();
  useEffect(() => {
    getItem('CURRENT_KID').then((currentKid) => {
      if (currentKid) {
        dispatch(appActions.setCurrentKid(JSON.parse(currentKid)));
        navigate('ChildVideoPlaylist', { kid: JSON.parse(currentKid) });
      }
    });
  }, [dispatch]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          const Icon = bottomNavigationsTab[route.name]?.icon;
          const IconFocused = bottomNavigationsTab[route.name]?.iconFocused;
          if (Icon) {
            return focused ? <IconFocused width={24} height={24} fill={color} /> : <Icon width={24} height={24} fill={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: 'transparent',
        tabBarInactiveTintColor: 'transparent',
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          display: isTabBarVisible ? 'flex' : 'none',
          backgroundColor: theme.colors.bottomNavigationBg,
        },
        tabBarLabelStyle: { display: 'none' },
        headerShown: false,
        unmountOnBlur: true,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNav}
        listeners={getTabListeners(isChildMode, handleTabPress)}
      />
      <Tab.Screen
        name="Child"
        component={ChildNav}
        listeners={getTabListeners(isChildMode, handleTabPress)}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNav}
        listeners={getTabListeners(isChildMode, handleTabPress)}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
