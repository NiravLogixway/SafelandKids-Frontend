import styled from 'styled-components/native';
import Input from '../Input';
import { TextInput } from 'react-native-paper';


export const TextareaInput = styled(TextInput).attrs({
  mode: 'outlined',
  theme: {roundness: 24},
  // outlineColor: '#DADCE0',
  placeholderTextColor: 'rgba(0,0,0,0.4)',
})`
  border-color: #fff000 !important;
  height: 112px;
  width: 100%;
  padding: 0px;
  font-size: 14px;
`;
