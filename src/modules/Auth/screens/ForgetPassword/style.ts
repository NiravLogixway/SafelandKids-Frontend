import styled from 'styled-components/native';

export const ForgetPasswordContainer = styled.View(({theme}) => ({
  flex: 1,
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.xl,
}));

export const ForgetPasswordText = styled.Text(({theme}) => ({
  fontSize: 20,
  color: theme.colors.text.primary,
}));
