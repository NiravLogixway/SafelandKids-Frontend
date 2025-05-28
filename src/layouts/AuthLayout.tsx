import { ImageBackground, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { ReactNode } from 'react';
import { useThemeContext } from '../context/ThemeContext';
import Header from '../component/app/Header';
import { AuthContainer, AuthContent } from './style';
import KeyboardAvoidView from './KeyboardAvoidView';
import bg2Image from '@/assets/images/bg2Image.png';
import Stack from '@/component/shared/Stack';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  titleColor?: string;
  isBack?: boolean;
  navigateLink?: string;
}

const AuthLayout = ({
  children,
  title,
  titleColor,
  isBack,
  navigateLink,
}: AppLayoutProps) => {
  const { theme } = useThemeContext();
  return (
    <Stack direction="column" style={{ flex: 1, height: '100%', width: '100%', position: 'relative' }}>
      <View style={{ flex: 1, backgroundColor: theme.colors.mainBg, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></View>
      <SafeAreaView style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} edges={['top']}>
        <ImageBackground
          source={bg2Image}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <KeyboardAvoidView keyboardVerticalOffset={80}>
            <AuthContainer>
              <Header
                title={title}
                titleColor={titleColor}
                isBack={isBack}
                navigateLink={navigateLink}
              />
              <AuthContent>{children}</AuthContent>
            </AuthContainer>
          </KeyboardAvoidView >
        </ImageBackground>
      </SafeAreaView>
    </Stack>
  );
};

export default AuthLayout;
