import styled, {css} from 'styled-components/native';
import {theme} from '@/config/theme';
import {Text, TextProps as PaperTextProps} from 'react-native-paper';
import {TextProps as RNTextProps} from 'react-native';

const colors: any = theme.colors.text;

interface StyledTextProps extends PaperTextProps<any> {
  textVariant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'xs';
  color?: string;
  weight?: 300 | 400 | 500 | 600 | 700;
  opacity?: number;
  align?: 'left' | 'right' | 'center' | 'auto' | 'justify';
  theme?: any;
}

// Define the style functions first
const getTextVariant = (props: StyledTextProps) => {
  return props.textVariant ? textVariants[props.textVariant] : '';
};

const getColor = ({theme, ...props}: StyledTextProps) => {
  if (props.color) {
    return {
      color: colors[props.color] ? colors[props.color] : props.color,
    };
  }
  return {};
};

const getWeight = (props: StyledTextProps) => {
  if (props.weight) {
    return {
      fontWeight: props.weight,
    };
  }
  return {};
};

const getOpacity = (props: StyledTextProps) => {
  if (props.opacity) {
    return {
      opacity: props.opacity,
    };
  }
  return {};
};

const getAlignment = (props: StyledTextProps) => {
  if (props.align) {
    return {
      textAlign: props.align,
    };
  }
  return {};
};

// Use the functional approach with the style functions
export const StyledText = styled(Text)<StyledTextProps>(props => ({
  ...getTextVariant(props),
  ...getColor(props),
  ...getWeight(props),
  ...getOpacity(props),
  ...getAlignment(props),
}));

const thin = css`
  font-family: ${theme.fonts.FONT_THIN};
`;
const light = css`
  font-family: ${theme.fonts.FONT_LIGHT};
`;
const regular = css`
  font-family: ${theme.fonts.FONT_REGULAR};
`;
const semibold = css`
  font-family: ${theme.fonts.FONT_MEDIUM};
`;
const bold = css`
  font-family: ${theme.fonts.FONT_BOLD};
`;

const textTypes: any = {
  thin: thin,
  light: light,
  regular: regular,
  bold: bold,
  labelLarge: bold,
};

const weight: any = {
  300: thin,
  400: light,
  500: regular,
  600: semibold,
  700: bold,
};

const h1 = {
  fontSize: 28,
  lineHeight: 36,
};
const h2 = {
  fontSize: 20,
  lineHeight: 26,
};
const h3 = {
  fontSize: 18,
  lineHeight: 24,
};
const h4 = {
  fontSize: 16,
};
const h5 = {
  fontSize: 14,
  lineHeight: 20,
};
const h6 = {
  fontSize: 12,
  lineHeight: 20,
};
const body1 = {
  fontSize: 16,
  lineHeight: 20,
};
const body2 = {
  fontSize: 14,
  lineHeight: 18,
};
const xs = {
  fontSize: 12,
  lineHeight: 16,
};

const textVariants: any = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  body1,
  body2,
  xs,
};
