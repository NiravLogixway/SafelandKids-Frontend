import React from 'react';
import { uniqueId } from 'lodash';
import { HelperText, Icon } from 'react-native-paper';
import { useThemeContext } from '../../../context/ThemeContext';

import Input from './Input';
import Picker from './Picker';
import Datepicker from './DatePicker';
import Textarea from './Textarea';
import OtpInput from './OtpInput';
import PasswordInput from './PasswordInput';

interface props {
  label: string;
  tip: string;
  error: string;
  errorMsg: string;
  helperText: string;
  name: string;
  icon: any;
  size: number;
  margin?: boolean;
  onIconPress?: () => void;
}

const generateField = (FormComponent: any) => {
  const FieldComponent = ({
    tip,
    error,
    errorMsg,
    name,
    helperText,
    icon,
    size,
    margin,
    onIconPress,
    ...otherProps
  }: props) => {
    const { theme } = useThemeContext();
    const fieldId = uniqueId('form-field-');
    const errorText = helperText ? helperText : getErrorText(error, errorMsg);
    const isError = !!(error || errorMsg);
    return (
      <>
        <>
          <FormComponent
            margin={margin}
            id={fieldId}
            name={name}
            error={isError}
            {...otherProps}
            helperText={errorText ? errorText : tip}
          />
        </>
        {/* {isError && (
          <HelperText
            type="error"
            visible={isError}
            padding="none"
            style={{ color: theme.colors.inputErrorBorderColor }}>
            {errorText || 'Required field'}
          </HelperText>
        )} */}
      </>
    );
  };

  return FieldComponent;
};

const getErrorText = (error: string, errorMsg: string) => {
  if (error) return error;
  if (errorMsg) return errorMsg;
  return '';
};

const Field = {
  Input: generateField(Input),
  OtpInput: generateField(OtpInput),
  PasswordInput: generateField(PasswordInput),
  // Picker: generateField(Picker),
  // DatePicker: generateField(Datepicker),
  // Textarea: generateField(Textarea),
};

export default Field;
