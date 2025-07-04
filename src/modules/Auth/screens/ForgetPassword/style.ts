import styled from 'styled-components/native';
import Box from '@/component/shared/Box';
import Form from '@/component/shared/Form';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '@/component/shared/Typography';
import Button from '@/component/shared/Button';

export const ForgetPasswordContainer = styled(Box)(({theme}) => ({
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
}));

export const SubmitButtonContainer = styled(Button).attrs(({theme}) => ({
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

export const SubmitButtonText = styled(Typography)(({theme}) => ({
  fontWeight: 600,
  color: theme.colors.text.primary,
}));

export const ForgetPasswordText = styled(Typography)(({theme}) => ({
  color: theme.colors.text.primary,
  fontSize: 14,
  fontFamily: theme.fonts.FONT_REGULAR,
  fontWeight: 600,
  marginBottom: theme.spacing.md,
}));
