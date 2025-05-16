import React from 'react';
import { useThemeContext } from '../../../context/ThemeContext';
import Spinner from '../Spinner';
import { Button as PaperButton } from 'react-native-paper';
import { ButtonProps } from 'react-native-paper';
import { styles } from './style';

interface IButtonProps extends ButtonProps {
  children: React.ReactNode;
  size?: number;
  loader?: boolean;
  style?: any;
  ref?: any;
}

const Button = ({
  children,
  size = 16,
  loader,
  style = {},
  mode = 'text',
  ...props
}: IButtonProps) => {
  const { theme } = useThemeContext();
  const customStyle = Array.isArray(style)
    ? style.reduce((prevStyle, style) => {
      prevStyle = { ...prevStyle, ...style };
      return prevStyle;
    })
    : style;

  const buttonStyle = [
    styles.button,
    mode === 'outlined' ? styles.outlineButton : {},
    mode === 'outlined'
      ? {
        borderColor: theme.colors.formButtonBackground,
        borderWidth: 1,
      }
      : {
        backgroundColor: theme.colors.formButtonBackground,
      },
    customStyle,
  ];

  return (
    <PaperButton
      textColor={
        mode === 'outlined' ? theme.colors.formButtonBackground : theme.colors.formButtonText
      }
      {...props}
      style={buttonStyle}
      labelStyle={mode === 'outlined' ? styles.outlineButtonLabel : undefined}
    >
      {loader ? (
        <Spinner size={size} color={theme.colors.formButtonText} style={{ marginTop: 10 }} />
      ) : (
        children
      )}
    </PaperButton>
  );
};

export default Button;
