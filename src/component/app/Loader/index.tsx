import React from 'react';
import {View} from 'react-native';
import Logo from '../../../asserts/icons/logo.svg';

const Loader = () => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: 'auto',
        backgroundColor: '#078484',
      }}>
      <Logo />
    </View>
  );
};

export default Loader;
