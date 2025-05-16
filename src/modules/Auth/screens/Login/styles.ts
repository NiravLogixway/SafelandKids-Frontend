import styled from 'styled-components/native';
import {Text} from 'react-native-paper';
import Box from '@/component/shared/Box';
import Form from '@/component/shared/Form';
import LinearGradient from 'react-native-linear-gradient';
import Button from '@/component/shared/Button';
import {TouchableOpacity} from 'react-native';

export const LoginContainer = styled(Box)(({theme}) => ({
  flex: 1,
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.xl,
}));

export const StyledInput = styled(Form.Field.Input)(({theme}) => ({
  backgroundColor: theme.colors.input.background,
  height: 50,
  color: theme.colors.inputText,
  paddingHorizontal: theme.spacing.sm,
  borderRadius: theme.borderRadius.md,
  marginTop: theme.spacing.md,
}));

export const ForgotPasswordText = styled(Text)(({theme}) => ({
  textAlign: 'right',
  marginVertical: theme.spacing.sm,
  color: theme.colors.text.primary,
}));

export const LoginButtonContainer = styled(Button).attrs(({theme}) => ({
  mode: 'contained',
  textColor: theme.colors.text.primary,
  style: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentStyle: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))(({theme}) => ({
  borderRadius: theme.borderRadius.md,
}));

export const GradientBackground = styled(LinearGradient).attrs(({theme}) => ({
  colors: theme.colors.background.gradient.primary.colors,
  start: theme.colors.background.gradient.primary.start,
  end: theme.colors.background.gradient.primary.end,
}))(({theme}) => ({
  width: '100%',
  height: 48,
  display: 'block',
  marginTop: theme.spacing.md,
  borderRadius: theme.borderRadius.md,
}));

export const LoginButtonText = styled(Text)(({theme}) => ({
  fontWeight: 600,
  color: theme.colors.text.primary,
}));

export const RegisterContainer = styled.View(({theme}) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing.md,
}));

export const RegisterText = styled(Text)(({theme}) => ({
  color: theme.colors.text.primary,
}));

export const RegisterLink = styled(Text)(({theme}) => ({
  color: theme.colors.text.primary,
  fontWeight: 'bold',
  textDecorationLine: 'underline',
}));
