import styled from 'styled-components/native';
// import {getStatusBarHeight} from 'src/utils/statusBarHeight';
import {StatusBar} from 'react-native';
import {theme} from '../config/theme';

export const AppStatusBar = styled(StatusBar).attrs({})``;

export const AppContainer = styled.View`
  display: flex;
  flex: 1;
`;

export const AppContent = styled.View`
  display: flex;
  flex: 1;
`;

export const AuthContainer = styled.View`
 display:flex;
  flex: 1;
`;

export const AuthContent = styled.View`
  display: flex;
  flex: 1;
`;
