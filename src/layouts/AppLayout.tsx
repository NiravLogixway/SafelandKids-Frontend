import React, { ReactNode, useEffect } from 'react';
import { AppContainer, AppContent } from './style';
import { useThemeContext } from '../context/ThemeContext';
import { useAppContext } from '../context/AppContext';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardAvoidView from './KeyboardAvoidView';
import Header from '../component/app/Header';
import bg2Image from '@/assets/images/bg2Image.png';

interface AppLayoutProps {
  route?: any;
  children: ReactNode;
  title?: string;
  titleColor?: string;
  isShowIcon?: boolean;
  isBack?: boolean;
  loader?: boolean;
  navigateLink?: string;
  isPrivate?: boolean;
  initialLoader?: boolean;
  isLogo?: boolean;
  isShowLoader?: boolean;
  Logo?: SVGElement;
}

const AppLayout = ({
  children,
  title,
  titleColor,
  isShowIcon,
  isBack,
  navigateLink,
  isLogo = false,
  Logo,
  isShowLoader = true,
  route,
}: AppLayoutProps) => {
  const { theme } = useThemeContext();
  const { loader, setLoader } = useAppContext();

  useEffect(() => {
    if (isShowLoader) {
      setLoader(true);
    }
  }, [isShowLoader, setLoader]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ImageBackground
        source={bg2Image}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <KeyboardAvoidView keyboardVerticalOffset={80}>
          <AppContainer style={{ backgroundColor: theme.colors.mainBg }}>
            <Header
              title={title}
              titleColor={titleColor}
              isShowIcon={isShowIcon}
              isBack={isBack}
              navigateLink={navigateLink}
              isLogo={isLogo}
              Logo={Logo}
              route={route}
            />
            <AppContent>{children}</AppContent>
          </AppContainer>
        </KeyboardAvoidView >
      </ImageBackground>
    </SafeAreaView>

  );
};

export default AppLayout;
