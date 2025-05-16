import styled from 'styled-components';
import PhoneInput from 'react-native-phone-input';
import {Row} from '../../../../style';
import {Image, View} from 'react-native';

export const PhoneInputComponent = styled(PhoneInput).attrs({
  buttonTextStyle: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff0000',
    borderColor: '#ff0000',
  },
})`
  height: 46px;
  width: 100%;
  padding: 16px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid;
`;

export const PhoneInputWrapper = styled(Row).attrs({})`
  position: relative;
`;
export const CountryFlag = styled(Image).attrs({})`
  height: 100%;
  width: 100%;
`;

export const PhoneCountryFlag = styled(View).attrs({})`
  aspect-ratio: 6/4;
  width: 24px;
`;
