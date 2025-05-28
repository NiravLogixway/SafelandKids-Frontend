import React, { ReactNode, useEffect } from 'react';
import { AppContainer, AppContent } from './style';
import { useThemeContext } from '../context/ThemeContext';
import { useAppContext } from '../context/AppContext';
import { ImageBackground, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardAvoidView from './KeyboardAvoidView';
import Header from '../component/app/Header';
import bg2Image from '@/assets/images/bg2Image.png';
import { useTabContext } from '@/context/TabContext';
import Stack from '@/component/shared/Stack';

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
  const { isTabBarVisible } = useTabContext();
  const { loader, setLoader } = useAppContext();

  useEffect(() => {
    if (isShowLoader) {
      setLoader(true);
    }
  }, [isShowLoader, setLoader]);

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
            <AppContainer>
              {isTabBarVisible && <Header
                header={header}
                title={title}
                titleColor={titleColor}
                isBack={isBack}
                navigateLink={navigateLink}
              />}
              <AppContent>{children}</AppContent>
            </AppContainer>
          </KeyboardAvoidView >
        </ImageBackground>
      </SafeAreaView>
    </Stack>
  );
};

export default AppLayout;
