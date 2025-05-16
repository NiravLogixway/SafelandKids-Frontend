import React, {useRef} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {useThemeContext} from '../../../../context/ThemeContext';
import {Icon, Wrapper, ErroWrapper} from './style';
import Typography from '@/component/shared/Typography';
import {TouchableOpacity} from 'react-native-gesture-handler';

export interface Option {
  label: string;
  value: string;
}

export interface PickerInputProps {
  options: Option[];
  name: string;
  onChange: (value: string | number, event: any) => void;
  placeholder?: string;
  placeholderColor?: string;
  error?: boolean;
  helperText?: string;
}

const Picker = ({
  options,
  name,
  onChange,
  placeholder,
  error,
  helperText,
  ...props
}: PickerInputProps) => {
  const {theme} = useThemeContext();
  const inputColors = theme.colors.input;
  const pickerRef = useRef<any>();

  const handleChange = (value: string, itemIndex: number) => {
    onChange(value, {
      target: {
        name,
        value,
      },
    });
  };

  const customStyles = {
    placeholder: {
      color: inputColors.placeholder,
    },
    inputIOS: {
      fontSize: 14,
      paddingHorizontal: 16,
      borderRadius: 50,
      borderColor: error ? inputColors.errorBorder : inputColors.border,
      borderWidth: 1,
      height: 50,
      color: inputColors.color,
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 16,
      borderRadius: 50,
      borderColor: error ? inputColors.errorBorder : inputColors.border,
      borderWidth: 1,
      height: 50,
      color: inputColors.color,
    },
    iconContainer: {
      zIndex: -1,
    },
  };

  return (
    <Wrapper>
      <RNPickerSelect
        ref={pickerRef}
        onValueChange={handleChange}
        items={options}
        placeholder={{
          label: placeholder,
          value: '',
        }}
        useNativeAndroidPickerStyle={false}
        style={customStyles}
        Icon={() => (
          <TouchableOpacity
            onPress={() => {
              pickerRef.current.togglePicker();
            }}>
            <Icon />
          </TouchableOpacity>
        )}
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
};

export default Picker;
