import styled from 'styled-components/native';
import {Modal} from 'react-native';

export const StyledModal = styled(Modal).attrs({})``;

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Content = styled.View`
  flex: 1;
  padding: 00px 20px;
  height: 20px;
`;

export const IconButton = styled.TouchableOpacity`
  padding: 10px;
`;

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  height: 64px;
  align-items: center;
  justify-content: space-between;
`;

export const LeftContainer = styled.View`
  width: 64px;
  height: 64px;
  align-items: center;
  justify-content: center;
`;
export const RightContainer = styled.View`
  width: 64px;
  height: 64px;
  align-items: center;
  justify-content: center;
`;
export const CenterContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 64px;
`;
