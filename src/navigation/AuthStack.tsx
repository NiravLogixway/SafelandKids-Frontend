import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';

import Login from '@/modules/Auth/screens/Login';
import Register from '@/modules/Auth/screens/Register';
import ForgetPassword from '@/modules/Auth/screens/ForgetPassword';
import ResetPassword from '@/modules/Auth/screens/ResetPassword';

// Define the type for the stack navigator
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  ResetPassword: { token?: string };
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

interface AuthNavigatorProps {
  screenOptions?: NativeStackNavigationOptions;
}

const AuthNavigator: React.FC<AuthNavigatorProps> = (props) => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      {...props}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPassword}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
