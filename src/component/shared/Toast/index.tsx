import React, { useState } from 'react';
import pubsub from 'sweet-pubsub';
import { StyledToast } from './style';
import type { ToastType } from './style';
import { useThemeContext } from '@/context/ThemeContext';
import { Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

let duration = 4000;
let timerId: any;

const ToastComponent = () => {
  const { theme } = useThemeContext();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const addToast = (props: any) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    duration = props.visibilityTime || 4000;
    setMessage(props.message);
    setType(props.type);
    setVisible(true);
    setVisible(true);
    timerId = setTimeout(() => {
      dismiss();
    }, duration);
  };

  React.useEffect(() => {
    pubsub.on('toast', addToast);
    return () => {
      pubsub.off('toast', addToast);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    setMessage('');
    setType('');
  };

  return (
    <Portal>
      <StyledToast
        visible={visible}
        onDismiss={dismiss}
        duration={duration}
        type={type as ToastType}
        theme={theme}
        wrapperStyle={{ top: insets.top + 40, position: 'absolute', left: 0, right: 0, zIndex: 9999 }}
      >
        {message}
      </StyledToast>
    </Portal>
  );
};

export default ToastComponent;
