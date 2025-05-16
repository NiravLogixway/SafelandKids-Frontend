import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

const KeyboardAvoidView = ({ children }: any) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={64}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidView;
