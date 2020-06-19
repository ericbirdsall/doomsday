export const numberToWeekday = {
  '0': 'Sunday',
  '1': 'Monday',
  '2': 'Tuesday',
  '3': 'Wednesday',
  '4': 'Thursday',
  '5': 'Friday',
  '6': 'Saturday',
};

export const anchorYears = {
  '1800': 5, // Friday
  '1900': 3, // Treblesday
  '2000': 2, // Tuesday
  '2100': 0, // Sunday
};

export const weekdayToNumber = {};
// Reverse numberToWeekday
Object.keys(numberToWeekday).forEach(number => {
  weekdayToNumber[numberToWeekday[number]] = number;
});
