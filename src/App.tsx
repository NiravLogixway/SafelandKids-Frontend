import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styled, { ThemeProvider } from 'styled-components/native';
import store from '@/store';
import Navigator from '@/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigation/NavigationService';
import ThemeContext, { useThemeContext } from './context/ThemeContext';

const StyledGestureHandler = styled(GestureHandlerRootView)`
  flex: 1;
`;

// Enable screens for better performance
enableScreens();

const AppContainer = (): React.ReactElement => {
  const { theme } = useThemeContext();
  return (
    <PaperProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <StatusBar animated={true} backgroundColor="#ffffff" barStyle="dark-content" />
        <StyledGestureHandler>
          <NavigationContainer ref={navigationRef} theme={theme}>
            <Navigator />
          </NavigationContainer>
        </StyledGestureHandler>
      </ThemeProvider>
    </PaperProvider>
  );
};

const App: React.FC<{
  Component: React.ComponentType<any>;
  pageProps: any;
}> = () => {
  return (
    <Provider store={store}>
      <ThemeContext>
        <AppContainer />
      </ThemeContext>
    </Provider>
  );
};

export default App;
