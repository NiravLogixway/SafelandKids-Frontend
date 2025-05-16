import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native-paper';
import { theme } from '../../../config/theme';


interface StyledSpinnerProps {
  color?: string;
}

export const StyledSpinner = styled(
  ActivityIndicator,
).attrs({
})``;