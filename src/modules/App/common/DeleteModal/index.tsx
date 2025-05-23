import React from 'react';
import { Modal, Portal, Button, Text } from 'react-native-paper';
import Box from '@/component/shared/Box';
import { useThemeContext } from '@/context/ThemeContext';
import Typography from '@/component/shared/Typography';

interface DeleteModalProps {
  visible: boolean;
  onDelete: () => void;
  onCancel: () => void;
  title: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onDelete,
  onCancel,
  title,
}) => {
  const { theme } = useThemeContext();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onCancel}
        contentContainerStyle={{
          backgroundColor: theme.colors.surface,
          padding: theme.spacing.lg,
          margin: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
        }}>
        <Box>
          <Box marginBottom={theme.spacing.lg}>
            <Typography
              variant="body1"
              weight={600}
              color={theme.colors.text.default}>
              {title}
            </Typography>
          </Box>
          <Box
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: theme.spacing.md,
            }}>
            <Button onPress={onCancel}>Cancel</Button>
            <Button
              mode="contained"
              onPress={onDelete}
              buttonColor={theme.colors.error}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Portal>
  );
};

export default DeleteModal; 