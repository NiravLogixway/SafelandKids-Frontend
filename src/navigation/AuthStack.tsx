import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import Login from '@/modules/Auth/screens/Login';
import Register from '@/modules/Auth/screens/Register';
import ForgetPassword from '@/modules/Auth/screens/ForgetPassword';
// Define the type for the stack navigator
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgetPassword: undefined;
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
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
