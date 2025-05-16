import React from 'react';
import { uniqueId } from 'lodash';
import { HelperText, Icon } from 'react-native-paper';
import { useThemeContext } from '../../../context/ThemeContext';

import Input from './Input';
import Picker from './Picker';
import Datepicker from './DatePicker';
import Textarea from './Textarea';
import OtpInput from './OtpInput';

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
    const errorText = helperText ? helperText : getErrorText(error, errorMsg); // ...helperText overridden by otherProps
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

export default {
  Input: generateField(Input),
  OtpInput: generateField(OtpInput),
  // Picker: generateField(Picker),
  // DatePicker: generateField(Datepicker),
  // Textarea: generateField(Textarea),
  // Phone: generateField(Phone),
  // Picker: generateField(Picker),
  // Location: generateField(LocationPlace),
  // File: generateField(File),
};

const getErrorText = (error: any, errorMsg: string) => {
  if (error) return error;
  else if (errorMsg) return errorMsg;
  else false;
};
