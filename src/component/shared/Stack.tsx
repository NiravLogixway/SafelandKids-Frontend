import React from 'react';
import {View, StyleSheet} from 'react-native';

interface StackProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: number;
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  divider?: boolean;
  mb?: number;
  mt?: number;
  style?: object;
}

export default function Stack({
  children,
  direction = 'column',
  gap = 0,
  justify = 'flex-start',
  align = 'flex-start',
  divider,
  mb = 0,
  mt = 0,
  style = {},
}: StackProps) {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          gap: gap * 8,
          marginBottom: mb * 8,
          marginTop: mt * 8,
        },
        {...style},
      ]}>
      {React.Children.map(children, (child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  divider: {
    height: 1,
  },
});
