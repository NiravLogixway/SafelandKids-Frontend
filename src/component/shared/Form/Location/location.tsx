import React, {ForwardedRef, forwardRef} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Input from '../Input';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useThemeContext} from '../../../../context/ThemeContext';
import {FormInputWrapper} from '../style';
import Target from '../../../../asserts/icons/target.svg';
import {Google_Map_API_Key} from '@env';
import {Text} from 'react-native-paper';

interface InputProps {
  className?: string;
  value?: string | number;
  label?: string;
  icon?: string;
  invalid?: boolean;
  filter?: RegExp;
  onChange?: (data: any) => void;
  password?: boolean;
  errorMessage: any;
  isShowIcon?: boolean;
  error?: boolean;
}

const Location = forwardRef(
  (
    {
      icon,
      className,
      filter,
      label,
      onChange,
      value,
      password,
      isShowIcon,
      error,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement> | any,
  ) => {
    const {theme} = useThemeContext();
    return (
      <ScrollView
        contentContainerStyle={{flex: 1, overflow: 'hidden'}}
        keyboardShouldPersistTaps="always"
        horizontal={true}>
        <FormInputWrapper>
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            onPress={(data: any, details = null) => {
              onChange && onChange(data?.description);
            }}
            textInputProps={{
              InputComp: Input,
              style: {
                height: 46,
                width: '100%',
                backgroundColor: theme.colors.inputBackgroundColor,
                color: theme.colors.inputTextColor,
              },
              defaultValue: value,
              multiline: false,
              error,
            }}
            query={{
              key: Google_Map_API_Key,
              language: 'en',
            }}
            enablePoweredByContainer={false}
            renderRow={(data: any, index: number) => (
              <Text
                style={[
                  locationStyle.placeName,
                  {color: theme.colors.primary},
                ]}>
                {data.description}
              </Text>
            )}
            {...props}
            ref={ref}
          />
          {isShowIcon && (
            <Target
              style={{position: 'absolute', right: 16, top: 10}}
              color={theme.colors.inputIconColor}
            />
          )}
        </FormInputWrapper>
      </ScrollView>
    );
  },
);

export default Location;

const locationStyle = StyleSheet.create({
  placeName: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 1,
  },
});
