import styled, {css} from 'styled-components/native';

import {Snackbar} from 'react-native-paper';
import {theme} from '../../../config/theme';

export type ToastType = 'success' | 'warning' | 'info' | 'danger';

interface ToastProps {
  type: ToastType;
}

export const StyledToast = styled(Snackbar).attrs({})<ToastProps>`
  ${props => variants[props.type]}
`;

const success = css`
  background-color: #138636;
  color: #ffffff;
`;

const warning = css`
  background-color: #ffbc11;
  color: #ffffff;
`;

const info = css`
  background-color: #4976ba;
  color: #ffffff;
`;

const danger = css`
  background-color: #c91432;
  color: #ffffff;
`;

const variants = {
  success,
  warning,
  info,
  danger,
};
