import React, {useState} from 'react';
import pubsub from 'sweet-pubsub';
import {StyledToast} from './style';

let duration = 4000;
let timerId: any;

const ToastComponent = () => {
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
    <>
      <StyledToast visible={visible} onDismiss={dismiss} duration={duration} type={type}>
        {message}
      </StyledToast>
    </>
  );
};

export default ToastComponent;
