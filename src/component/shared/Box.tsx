import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import {
  space,
  layout,
  color,
  flexbox,
  border,
  position,
  typography,
  SpaceProps,
  LayoutProps,
  ColorProps,
  FlexboxProps,
  BorderProps,
  PositionProps,
  TypographyProps,
} from 'styled-system';

interface BoxProps
  extends SpaceProps,
  LayoutProps,
  ColorProps,
  FlexboxProps,
  BorderProps,
  PositionProps,
  TypographyProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ children, style, ...props }: any) => {
  const combinedStyle = StyleSheet.flatten([
    styles.base,
    space(props),
    layout(props),
    color(props),
    flexbox(props),
    border(props),
    position(props),
    typography(props),
    style,
  ]);

  return (
    <View style={combinedStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    // Add any base styles here if needed
  },
});

export default Box;
