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
  children: ReactNode;
  header?: ReactNode;
  title?: string;
  titleColor?: string;
  isBack?: boolean;
  loader?: boolean;
  navigateLink?: string;
  isPrivate?: boolean;
  initialLoader?: boolean;
  isShowLoader?: boolean;
}

const AppLayout = ({
  children,
  header,
  title,
  titleColor,
  isBack,
  navigateLink,
  isShowLoader = true,
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
              header={header}
              title={title}
              titleColor={titleColor}
              isBack={isBack}
              navigateLink={navigateLink}
            />
            <AppContent>{children}</AppContent>
          </AppContainer>
        </KeyboardAvoidView >
      </ImageBackground>
    </SafeAreaView>

  );
};

export default AppLayout;
