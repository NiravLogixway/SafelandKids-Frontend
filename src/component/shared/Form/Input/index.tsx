import React from 'react';
import Typography from '@/component/shared/Typography';
import { StyledInput, Wrapper, ErroWrapper } from './style';
import { useThemeContext } from '../../../../context/ThemeContext';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

interface InputProps {
  error?: boolean;
  name: string;
  onChange?: (value: string, event?: any) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value?: any;
  autofocus?: boolean;
  password?: boolean;
  helperText?: string;
  style?: object;
  wrapperStyle?: object;
  placeholder?: string;
  roundness?: number;
}

const Input: React.FC<InputProps> = ({
  error,
  name,
  password,
  helperText,
  onChange,
  value,
  wrapperStyle,
  roundness,
  ...props
}) => {
  const { theme } = useThemeContext();

  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value, {
        target: {
          name,
          value,
        },
      });
    }
  };

  return (
    <Wrapper style={wrapperStyle}>
      <StyledInput
        mode="outlined"
        value={value}
        textColor={theme.colors.input.color}
        outlineColor={error ? theme.colors.input.errorBorder : theme.colors.input.border}
        outlineStyle={{ borderWidth: 0.5 }}
        secureTextEntry={password}
        onChangeText={handleChange}
        autoCapitalize="none"
        theme={{ roundness: roundness ?? theme.borderRadius.md, ...theme }}
        placeholderTextColor={theme.colors.input.placeholder}
        {...props}
      />
      {helperText && helperText !== '' && (
        <ErroWrapper>
          <Typography color="error" variant="xs">
            {helperText}
          </Typography>
        </ErroWrapper>
      )}
    </Wrapper>
  );
};

export default Input;
