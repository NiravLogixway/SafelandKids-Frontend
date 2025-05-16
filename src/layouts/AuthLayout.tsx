import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { ReactNode } from 'react';
import { useThemeContext } from '../context/ThemeContext';
import Header from '../component/app/Header';
import { AuthContainer, AuthContent } from './style';
import KeyboardAvoidView from './KeyboardAvoidView';
import bg2Image from '@/assets/images/bg2Image.png';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  titleColor?: string;
  isShowIcon?: boolean;
  isBack?: boolean;
  navigateLink?: string;
}

const AuthLayout = ({
  children,
  title,
  titleColor,
  isShowIcon,
  isBack,
  navigateLink,
}: AppLayoutProps) => {
  const { theme } = useThemeContext();
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ImageBackground
        source={bg2Image}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <KeyboardAvoidView keyboardVerticalOffset={80}>
          <AuthContainer style={{ backgroundColor: theme.colors.mainBg }}>
            <Header
              title={title}
              titleColor={titleColor}
              isShowIcon={isShowIcon}
              isBack={isBack}
              navigateLink={navigateLink}
            />
            <AuthContent>{children}</AuthContent>
          </AuthContainer>
        </KeyboardAvoidView >
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AuthLayout;
