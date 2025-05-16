import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useThemeContext } from '@/context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import Home from '@/modules/App/screens/Home';
import Profile from '@/modules/App/screens/Profile';

// Define the type for the stack navigator
export type AppStackParamList = {
  MainTabs: undefined;
  Settings: undefined;
};

// Define the type for the tab navigator
export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
};

const AppStack = createNativeStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Bottom Tab Navigator
const MainTabs = () => {
  const { theme } = useThemeContext();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const Icon = bottomNavigationActiveTab[route.name]?.icon;
          if (Icon) {
            if (focused === true) {
              return <Icon size={24} color={color} />;
            }
            return <Icon size={24} color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopWidth: 0,
          elevation: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

interface AppNavigatorProps {
  screenOptions?: NativeStackNavigationOptions;
}

const AppNavigator: React.FC<AppNavigatorProps> = (props) => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      {...props}
    >
      <AppStack.Screen name="MainTabs" component={MainTabs} />
      <AppStack.Screen name="Settings" component={Settings} />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
