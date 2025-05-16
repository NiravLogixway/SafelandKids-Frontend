import * as React from 'react';
import {Dialog, Portal} from 'react-native-paper';
import {useThemeContext} from '../../../context/ThemeContext';

const DialogComponent = ({onClose, children, visible, title, action}: any) => {
  const {theme} = useThemeContext();
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onClose}
        style={{
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.inputBorderColor,
          shadowRadius: 5,
          shadowOpacity: 1,
        }}>
        {title && (
          <Dialog.Title style={{color: theme.colors.cardTitle}}>
            {title}
          </Dialog.Title>
        )}
        <Dialog.Content>{children}</Dialog.Content>
        {action && <Dialog.Actions>{action}</Dialog.Actions>}
      </Dialog>
    </Portal>
  );
};

export default DialogComponent;
