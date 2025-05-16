import React, {useMemo, useRef} from 'react';
import {
  CountryFlag,
  PhoneCountryFlag,
  PhoneInputComponent,
  PhoneInputWrapper,
} from './style';
import {useThemeContext} from '../../../../context/ThemeContext';
import {View} from 'react-native-reanimated/lib/typescript/Animated';
import {Image} from 'react-native';

interface PhoneProps {
  onChange: (data: string, event: any) => void;
  placeholder?: string;
  value?: string;
  error?: boolean;
}

const Phone: React.FC<PhoneProps> = ({onChange, value, error, ...props}) => {
  const {theme} = useThemeContext();
  const phoneRef = useRef<any>({});

  const onPhoneInputChange = (value: string, iso2: string | undefined) => {
    const data = {
      number: value,
      code: '',
    };
    if (iso2) {
      data.code = iso2.toUpperCase();
    }
    onChange(data.number, null);
  };

  return (
    <PhoneInputWrapper>
      <PhoneInputComponent
        ref={phoneRef}
        onChangePhoneNumber={onPhoneInputChange}
        textProps={{
          placeholder: props.placeholder,
          placeholderTextColor: theme.colors.placeholderText,
        }}
        textStyle={{
          fontSize: 12,
          color: theme.colors.inputTextColor,
        }}
        flagStyle={{
          height: 12,
          aspectRatio: 6 / 4,
          position: 'absolute',
        }}
        style={{
          backgroundColor: theme.colors.inputBackgroundColor,
          borderColor: error
            ? theme.colors.inputErrorBorderColor
            : theme.colors.inputBorderColor,
        }}
        renderFlag={({imageSource, ...props}) => {
          return (
            <PhoneCountryFlag style={{backgroundColor: theme.colors.mainBg}}>
              {imageSource && <CountryFlag source={imageSource} />}
            </PhoneCountryFlag>
          );
        }}
        initialValue={value}
        {...props}
      />
    </PhoneInputWrapper>
  );
};

export default Phone;
