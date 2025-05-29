import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { useThemeContext } from '@/context/ThemeContext';
import { StyledInput, IconContainer } from './style';
import Form from '../Field';

interface PasswordInputProps {
  name: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  onChange?: (value: string, event?: any) => void;
  value?: string;
  style?: object;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  placeholder,
  error,
  helperText,
  onChange,
  value,
  style,
  ...props
}) => {
  const { theme } = useThemeContext();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={{ position: 'relative' }}>
      <StyledInput
        name={name}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        onChange={onChange}
        value={value}
        style={style}
        password={!showPassword}
        {...props}
      />
      <IconContainer>
        <TouchableOpacity onPress={toggleShowPassword}>
          <Icon
            source={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color={theme.colors.input.color}
          />
        </TouchableOpacity>
      </IconContainer>
    </View>
  );
};

export default PasswordInput; 