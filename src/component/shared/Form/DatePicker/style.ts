import styled from 'styled-components';
import DatePicker from 'react-native-date-picker';
import {TouchableOpacity, View} from 'react-native';
import {Modal} from 'react-native-paper';
import DateIcon from '@/assets/icons/date.svg';

export const Icon = styled(DateIcon)`
  margin: 12px 20px 12px 10px;
  position: absolute;
  right: 0;
`;

export const DatePickerComponent = styled(Modal).attrs({})``;

export const InputContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.75,
})`
  position: relative;
`;
export const DateOverlayContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.75,
})`
  position: absolute;
  height: 80%;
  width: 100%;
`;

export const DateContainer = styled(View).attrs({})`
  width: 100%;
  position: relative;
  z-index: -1;
  margin-bottom: 16px;
`;
