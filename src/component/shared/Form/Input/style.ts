import {TextInput} from 'react-native-paper';
import styled from 'styled-components/native';

// Styled components with theme
export const Wrapper = styled.View(({theme}) => ({
  width: '100%',
  marginBottom: theme.spacing.sm,
  borderRadius: 100,
}));

export const StyledInput = styled(TextInput)(({theme}) => ({
  width: '100%',
  backgroundColor: theme.colors.input.background,
  borderRadius: 100,
  color: theme.colors.input.color,
  placeholderTextColor: theme.colors.input.placeholder,
}));

export const ErroWrapper = styled.View(({theme}) => ({
  paddingLeft: theme.spacing.sm,
  marginTop: theme.spacing.xs,
}));

// Default theme values for input - these will be moved to theme.ts
export const defaultInputTheme = {
  colors: {
    input: {
      border: 'rgba(196, 197, 200, 1)',
      errorBorder: '#b83d3d',
      background: 'transparent',
      text: 'rgba(0, 0, 0, 0.87)',
    },
  },
};
