import React from 'react';
import { Text } from 'react-native-paper';
import { useThemeContext } from '../../../context/ThemeContext';
import DialogComponent from '../../shared/Dialog';
import styled from 'styled-components/native';

interface IDeleteCampaignModelProps {
  visible: boolean;
  campaignName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const PermissionModel = ({
  visible,
  onConfirm,
  onCancel,
}: IDeleteCampaignModelProps) => {
  const { theme } = useThemeContext();
  return (
    <DialogComponent
      visible={visible}
      action={
        <ButtonContainer>
          <Text onPress={onCancel}>cancel</Text>
          <Text onPress={onConfirm}>ok</Text>
        </ButtonContainer>
      }>
      <Text
        style={{
          color: theme.colors.cardSubText,
        }}>
        To continue, let your device turn on location, which uses Google's
        location service.
      </Text>
    </DialogComponent>
  );
};

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export default PermissionModel;
