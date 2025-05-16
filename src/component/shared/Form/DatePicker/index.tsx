import React, {useState} from 'react';
import {DateContainer, DateOverlayContainer, Icon, InputContainer} from './style';
import {useThemeContext} from '../../../../context/ThemeContext';

import {Text} from 'react-native-paper';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import moment from 'moment';
import Typography from '../../Typography';
import Input from '../Input';
import {ErroWrapper} from '../Input/style';

interface CustomDatepickerProp {
  name: string;
  onChange: (date: any) => void;
  confirmBtnText?: string;
  cancelBtnText?: string;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
  placeholder?: string;
  helperText?: string;
  mode?: 'date' | 'time' | 'datetime';
  value?: any;
  isShowIcon?: boolean;
  error?: boolean;
  isOnlyDatePicker?: boolean;
}

const Datepicker: React.FC<CustomDatepickerProp> = ({
  name,
  onChange,
  confirmBtnText = 'Confirm',
  cancelBtnText = 'Cancel',
  minDate,
  maxDate,
  format = 'DD-MM-YYYY',
  placeholder = '',
  mode = 'date',
  value,
  isShowIcon,
  error,
  helperText,
  isOnlyDatePicker = false,
  ...props
}) => {
  const {theme} = useThemeContext();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const inputColors = theme.colors.input;
  const date = value ? new Date(value) : new Date();

  return (
    <InputContainer>
      {!isOnlyDatePicker && (
        <>
          <DateOverlayContainer onPress={() => setShowDatePicker(!showDatePicker)} />
          <DateContainer>
            <Input
              key={value}
              name={name}
              placeholder={placeholder}
              defaultValue={value ? moment(date)?.format(format) : ''}
              readOnly
              wrapperStyle={{marginBottom: 0}}
              error={error}
            />
            <Icon />
            {helperText && helperText !== '' && (
              <ErroWrapper>
                <Typography color="primary" variant="xs">
                  {helperText}
                </Typography>
              </ErroWrapper>
            )}
          </DateContainer>
        </>
      )}
      <DatePicker
        modal
        open={showDatePicker}
        mode={mode}
        date={date}
        onCancel={() => {
          setShowDatePicker(false);
        }}
        style={{
          backgroundColor: '#ffffff',
        }}
        name={name}
        onConfirm={(date) => {
          const formatedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
          onChange(formatedDate);
          setShowDatePicker(false);
        }}
        buttonColor={theme.colors.title}
        {...props}
      />
    </InputContainer>
  );
};

export default Datepicker;
