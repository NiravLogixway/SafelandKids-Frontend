import React from 'react';
import { useHeaderHeight } from '@react-navigation/elements';
import styled from 'styled-components/native';
import useKeyboard from 'react-native-keyboard-aware';

const KeyboardAvoidView = ({ children }: any) => {
  const height = useHeaderHeight();
  const { isKeyboardVisible, keyboardOffset } = useKeyboard({ android: false });
  // if (!isKeyboardVisible) return children;

  return (
    <StyledView bottom={keyboardOffset}>
      {children}
    </StyledView>
  );
};

const StyledView = styled.View<{ bottom: number }>`
  flex: 1;
  position: absolute;
  bottom: ${props => props.bottom}px;
  width: 100%;
  height: 100%;
`;

export default KeyboardAvoidView;
