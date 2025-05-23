import styled from 'styled-components/native';
import Button from '@/component/shared/Button';
import LinearGradient from 'react-native-linear-gradient';
import Box from '@/component/shared/Box';
import {Pressable} from 'react-native';

export const HomeContainer = styled(Box)(({theme}) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

export const KidCardWrapper = styled(Pressable)(({theme}) => ({
  marginBottom: theme.spacing.lg,
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  overflow: 'hidden',
  height: 100,
  backgroundColor: theme.colors.surface,
  borderRadius: theme.borderRadius.xl,
  padding: theme.spacing.md,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const GradientBackground = styled(LinearGradient).attrs(({theme}) => ({
  colors: theme.colors.background.gradient.primary.colors,
  start: theme.colors.background.gradient.primary.start,
  end: theme.colors.background.gradient.primary.end,
}))(({theme}) => ({
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.borderRadius.round,
}));

export const AddKidButton = styled(Box)(({theme}) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing.sm,
  borderRadius: theme.borderRadius.xl,
  paddingBlock: theme.spacing.md,
  marginHorizontal: theme.spacing.lg,
  marginBottom: theme.spacing.lg,
}));

export const AddKidText = styled.Text(({theme}) => ({
  color: theme.colors.text.primary,
  fontWeight: 'bold',
  fontSize: 16,
}));
