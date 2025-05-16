import React, {forwardRef, Ref} from 'react';
import PropTypes from 'prop-types';
import {StyledInput, TextareaInput} from './style';
import {useThemeContext} from '../../../../context/ThemeContext';
import Input from '../Input';
import {ErroWrapper, Wrapper} from '../Input/style';
import Typography from '../../Typography';

interface TextareaProps {
  name: string;
  className?: string;
  value: any;
  label?: string;
  icon?: string;
  invalid?: boolean;
  filter?: RegExp;
  onChange?: (value: string | number | null, event: any) => void;
  password?: boolean;
  errorMessage?: string;
  helperText?: string;
  onBlur?: () => void;
  error?: boolean;
}

const Textarea = forwardRef<HTMLInputElement, TextareaProps>(
  (
    {
      icon,
      className,
      filter,
      label,
      value,
      helperText,
      onChange = () => {},
      password,
      error,
      ...props
    },
    ref: Ref<HTMLInputElement>,
  ) => {
    const {theme} = useThemeContext();
    const inputColors = theme.colors.input;
    const handleChange = (data: string | number | null) => {
      onChange && onChange(data, null);
    };

    return (
      <Wrapper>
        <TextareaInput
          textColor={theme.colors.inputTextColor}
          outlineColor={error ? inputColors.errorBorder : inputColors.border}
          outlineStyle={{borderWidth: 0.5}}
          secureTextEntry={password}
          onChangeText={handleChange}
          autoCapitalize="none"
          multiline
          numberOfLines={4}
          value={value}
          {...props}
        />
        {helperText && helperText !== '' && (
          <ErroWrapper>
            <Typography color="primary" variant="xs">
              {helperText}
            </Typography>
          </ErroWrapper>
        )}
      </Wrapper>
    );
  },
);

export default Textarea;
