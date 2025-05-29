import styled from 'styled-components/native';
import Form from '@/component/shared/Form';
import Button from '@/component/shared/Button';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '@/component/shared/Typography';
import Box from '@/component/shared/Box';
import {Switch} from 'react-native-paper';

export const ProfileContainer = styled(Box)(({theme}) => ({
  marginBlock: theme.spacing.lg,
  borderRadius: theme.borderRadius.lg,
  backgroundColor: theme.colors.background.secondary,
  margin: theme.spacing.md,
  paddingBlock: theme.spacing.md,
  height: 'max-content',
}));

export const MenuList = styled(Box)(({theme}) => ({
  paddingHorizontal: theme.spacing.lg,
}));

export const MenuItem = styled(Box)(({theme, isLast}) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottomWidth: isLast ? 0 : 1,
  borderBottomColor: theme.colors.border.level0,
  height: 48,
}));

export const MenuText = styled.Text<{isLast?: boolean}>(({theme, isLast}) => ({
  fontSize: 16,
  fontWeight: 600,
  color: theme.colors.text.primary,
}));

export const ThemeSwitch = styled(Switch)(({theme}) => ({
  marginLeft: theme.spacing.md,
}));

export const StyledInput = styled(Form.Field.Input)(({theme}) => ({
  backgroundColor: theme.colors.input.background,
  height: 50,
  color: theme.colors.inputText,
  paddingHorizontal: theme.spacing.sm,
  borderRadius: theme.borderRadius.md,
  marginTop: theme.spacing.md,
}));

export const UpdateButtonContainer = styled(Button).attrs(({theme}) => ({
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
  backgroundColor: 'transparent',
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

export const UpdateButtonText = styled(Typography)(({theme}) => ({
  fontWeight: 600,
  color: theme.colors.text.primary,
}));
