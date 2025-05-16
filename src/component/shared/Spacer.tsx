import React from 'react';
import {View} from 'react-native';

type SpacerProps = {
  x?: number;
  y?: number;
  basis?: number;
};

const Spacer: React.FC<SpacerProps> = ({x, y, basis}) => {
  const style = {
    width: x ? x * 8 : 0,
    height: y ? y * 8 : 0,
    flexBasis: basis,
  };

  return <View style={style} />;
};

export default Spacer;
