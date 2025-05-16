import {theme} from '@/config/theme';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

const AppCalendar = ({...rest}) => {
  return (
    <Calendar
      theme={{
        monthTextColor: theme.colors.text.textPrimary,
        textMonthFontSize: 16,
        textMonthFontWeight: '500',
        // Day text style
        dayTextColor: theme.colors.text.textSecondary,
        textDayFontSize: 16,
        textDayFontWeight: '500',
        // Today text style
        todayTextColor: theme.colors.text.textSecondary,
        textDayHeaderFontSize: 14,
        textDayHeaderFontWeight: 'bold',
        // Other text styles
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        arrowColor: theme.colors.primary,
        disabledArrowColor: '#d9e1e8',
        monthTextColor: theme.colors.text.textPrimary,
        indicatorColor: 'blue',
      }}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({});

export default AppCalendar;
