/**
 * Calculates the Doomsday for a given month and leap year
 * @param {String} Month padded to length 2 with zeroes
 * @param {Boolean} true if the given year is a leap year, otherwise false
 * @returns {Object: {String month, String day}} Doomsday for given month and leap year
*/
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
  if (!day) {
    throw new Error(`Invalid month`);
  }
  if (Array.isArray(day)) {
    day = leapYear ? day[1] : day[0];
  }
  return {month, day};
}
