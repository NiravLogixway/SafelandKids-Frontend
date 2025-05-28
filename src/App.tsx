import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styled, { ThemeProvider } from 'styled-components/native';
import store from '@/store';
import Navigator from '@/navigation';
import ThemeContext, { useThemeContext } from './context/ThemeContext';
import ToastComponent from './component/shared/Toast';
import TabContextProvider from './context/TabContext';

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
          <TabContextProvider>
            <Navigator />
          </TabContextProvider>
          <ToastComponent />
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeContext>
          <AppContainer />
        </ThemeContext>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
