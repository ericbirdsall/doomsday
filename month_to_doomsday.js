
export const monthToDoomsday = function(month, leapYear) {
  // March Doomsday is last day of February
  if (month === '03') {
    month = '02';
  }
  let day = {
    '01': ['03', '04'],
    '02': ['28', '29'],
    '04': '04',
    '05': '09',
    '06': '06',
    '07': '11',
    '08': '08',
    '09': '05',
    '10': '10',
    '11': '07',
    '12': '12',
  }[month];
  if (Array.isArray(day)) {
    day = leapYear ? day[1] : day[0];
  }
  return {month, day};
}
