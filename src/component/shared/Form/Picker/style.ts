import styled from 'styled-components/native';
import {TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PickerIcon from '@/assets/icons/picker-dropdown.svg';

export const Icon = styled(PickerIcon)`
  margin: 12px 16px 12px 10px;
`;

export const Wrapper = styled(View)`
  margin-bottom: 16px;
`;

export const ErroWrapper = styled(View)`
  margin-left: 16px;
  margin-top: 4px;
`;
