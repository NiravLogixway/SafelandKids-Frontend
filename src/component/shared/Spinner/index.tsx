import React from 'react';
import PropTypes from 'prop-types';
import {StyledSpinner} from './style';
import {useThemeContext} from '../../../context/ThemeContext';

interface ISpinnerProps {
  color?: string;
  size?: 'small' | 'large' | number;
  style?: any;
}

const Spinner = ({color, size = 'small', ...props}: ISpinnerProps) => {
  const {theme} = useThemeContext();
  const loaderColor = color ?? theme.colors.loaderColor;

  return <StyledSpinner size={size} color={loaderColor} {...props} />;
};

export default Spinner;
