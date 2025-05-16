import React, {ReactNode} from 'react';
import {
  StyledModal,
  Container,
  HeaderContainer,
  LeftContainer,
  RightContainer,
  CenterContainer,
  IconButton,
  Content,
} from './style';
import { Text } from 'react-native-paper';

interface ModalProps {
  title?: string;
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({
  title,
  visible,
  onClose,
  children,
}) => {
  return (
    <StyledModal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      <Container>
        <HeaderContainer>
          <LeftContainer />
          <CenterContainer>
            {title && <Text>{title}</Text>}
          </CenterContainer>
          <RightContainer>
            <IconButton onPress={onClose}>
              {/* <CloseIcon /> */}
            </IconButton>
          </RightContainer>
        </HeaderContainer>
        <Content>{children}</Content>
      </Container>
    </StyledModal>
  );
};

export default ModalComponent;
