import React, { ReactNode } from 'react';
import { StyledText } from './style';
import { TextProps } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';

interface TypographyProps {
  weight?: 300 | 400 | 500 | 600 | 700;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'xs';
  color?: 'textPrimary' | 'textSecondary' | 'primary' | 'secondary' | 'success' | 'error' | any;
  opacity?: number;
  align?: 'left' | 'right' | 'center' | 'auto' | 'justify';
  style?: any;
  children?: ReactNode;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  color,
  numberOfLines,
  ellipsizeMode,
  children,
  weight,
  ...props
}) => {
  return (
    <StyledText
      textVariant={variant}
      color={color}
      weight={weight}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...props}>
      {children}
    </StyledText>
  );
};

export default Typography;
