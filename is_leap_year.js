/**
 * Calculates whether the given year is a leap year
 * @param {String} Year (YYYY)
 * @returns {Boolean} True if the given year is a leap year, otherwise false
*/
export const isLeapYear = function(year) {
  year = +year;
  if (year % 100 === 0) {
    return Math.floor(year / 400) === (year / 400);
  }
  return year % 4 === 0;
}
