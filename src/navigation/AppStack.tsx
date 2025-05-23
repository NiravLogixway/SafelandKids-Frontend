import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

// Import screens
import Home from '@/modules/App/screens/Home';
import Profile from '@/modules/App/screens/Profile';
import { bottomNavigationsTab } from './constants/tabMenus';
import ChildForm from '@/modules/App/screens/Child/ChildForm';
import EditProfile from '@/modules/App/screens/Profile/EditProfile';
import ChildPlaylists from '@/modules/App/screens/Child/ChildPlaylists';
import ChildVideoPlayer from '@/modules/App/screens/Child/ChildVideoPlayer';
import { Kid } from '@/modules/App/store/appTypes';

// Define the type for the tab navigator
export type MainTab = {
  Home: undefined;
  Child: undefined;
  Profile: undefined;
};

// Define the type for the stack navigator
export type HomeStack = {
  ChildList: undefined;
};

export type ChildStack = {
  ChildForm: { mode?: 'add' | 'edit'; kid?: Kid };
  ChildPlaylist: undefined;
  ChildVideoPlayer: { videoId: string };
};

export type ProfileStack = {
  Profile: undefined;
  EditProfile: undefined;
};

interface AppNavigatorProps {
  screenOptions?: NativeStackNavigationOptions;
}

const Tab = createBottomTabNavigator<MainTab>();
const HomeStack = createNativeStackNavigator<HomeStack>();
const ChildStack = createNativeStackNavigator<ChildStack>();
const ProfileStack = createNativeStackNavigator<ProfileStack>();

const HomeNav = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="ChildList" component={Home} />
    </HomeStack.Navigator>
  );
};

const ChildNav = () => {
  return (
    <ChildStack.Navigator screenOptions={{ headerShown: false }}>
      <ChildStack.Screen name="ChildForm" component={ChildForm} />
      <ChildStack.Screen name="ChildPlaylist" component={ChildPlaylists} />
      <ChildStack.Screen name="ChildVideoPlayer" component={ChildVideoPlayer} />
    </ChildStack.Navigator>
  );
};

const ProfileNav = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
    </ProfileStack.Navigator>
  );
};

const AppNavigator: React.FC<AppNavigatorProps> = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const Icon = bottomNavigationsTab[route.name]?.icon;
          const IconFocused = bottomNavigationsTab[route.name]?.iconFocused;
          if (Icon) {
            if (focused === true) {
              return <IconFocused width={24} height={24} fill={color} />;
            }
            return <Icon width={24} height={24} fill={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: "transparent",
        tabBarInactiveTintColor: "transparent",
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          marginBlock: 10
        },
        tabBarLabelStyle: {
          display: 'none',
        },
        headerShown: false,
        unmountOnBlur: true,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeNav} />
      <Tab.Screen name="Child" component={ChildNav} />
      <Tab.Screen name="Profile" component={ProfileNav} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
