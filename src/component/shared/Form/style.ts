import styled from 'styled-components/native';
import Box from '@/component/shared/Box';

export const FormContainer = styled(Box)(({theme}) => ({
  flex: 1,
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.xl,
}));

export const FormInputLabel = styled.Text(({theme}) => ({
  fontSize: 14,
  fontWeight: '500',
  marginBottom: theme.spacing.xs,
}));
