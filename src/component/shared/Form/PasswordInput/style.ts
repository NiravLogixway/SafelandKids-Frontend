import styled from 'styled-components/native';
import Input from '../Input';

export const StyledInput = styled(Input)(({theme}) => ({
  backgroundColor: theme.colors.input.background,
  height: 50,
  color: theme.colors.inputText,
  paddingHorizontal: theme.spacing.sm,
  borderRadius: theme.borderRadius.md,
  marginTop: theme.spacing.md,
}));

export const IconContainer = styled.View`
  position: absolute;
  right: ${({theme}) => theme.spacing.sm}px;
  transform: translateY(25px);
  z-index: 1;
  padding: ${({theme}) => theme.spacing.xs}px;
`;
