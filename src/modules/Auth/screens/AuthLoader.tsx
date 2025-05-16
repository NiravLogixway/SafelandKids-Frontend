import React from 'react';
import styled from 'styled-components/native';
import { useThemeContext } from '@/context/ThemeContext';

const Container = styled.View<{ themeColor: string }>`
  display: block;
  background-color: rgba(255, 190, 9, 0.8);
  position: relative;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const LoaderScreen = () => {
  const { theme } = useThemeContext();

  return (
    <Container themeColor={theme.colors.amber}>
      <StyledImage
        source={require('@/assets/images/welcome.png')}
        resizeMode="cover"
      />
    </Container>
  );
};

export default LoaderScreen;
