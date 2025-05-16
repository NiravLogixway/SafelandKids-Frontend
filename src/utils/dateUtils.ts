import moment from 'moment';

export function convertToAmPm(time: string): string {
  const momentTime = moment(time, 'HH:mm');
  return momentTime.format('hh:mm A');
}

export function dateToFromNowDaily(date: Date, format?: string, addDays = 0) {
  var fromNow = format ? moment(date).format(format) : moment(date).add(addDays, 'd').fromNow();
  return moment(date).calendar(null, {
    lastWeek: `[${fromNow}]`,
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    sameElse: function () {
      return `[${fromNow}]`;
    },
  });
}
