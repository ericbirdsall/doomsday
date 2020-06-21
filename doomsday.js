// https://en.wikipedia.org/wiki/Doomsday_rule

import moment from 'moment';

import {
  numberToWeekday,
  weekdayToNumber,
  anchorYears,
} from './constants.js';

import {isLeapYear} from './is_leap_year.js';
import {monthToDoomsday} from './month_to_doomsday.js';
import logger from './logger.js';

export let getAnchorDay = function(date) {
  let [year, month, day] = date.split('-');

  let lastTwoYearDigits = +year.substring(2);

  let yearFloor = Math.floor(lastTwoYearDigits / 12);
  let yearRemainder = lastTwoYearDigits % 12;
  let secondaryQuotient = Math.floor(yearRemainder / 4);
  logger.explain(`A: Floor of ${lastTwoYearDigits} / 12: ${yearFloor}`);
  logger.explain(`B: Remainder of above: ${yearRemainder}`);
  secondaryQuotient = secondaryQuotient % 7;
  logger.explain(`C: Floor of above / 4: ${secondaryQuotient}`);
  let d = (yearFloor + yearRemainder + secondaryQuotient) % 7;

  logger.explain(`D: Sum of above mod 7:  ${d}`);
  let anchor = year.substring(0, 2) + '00';

  let dayIndex = (d + anchorYears[anchor]) % 7;
  let doomsday = numberToWeekday[dayIndex];
  return doomsday;
}

/**
 * Calculates the closest doomsday date in a month to the given date
 * @param {String} Date in ISO format (YYYY-MM-DD)
 * @returns {String} Date in ISO format (YYYY-MM-DD)
*/
export let getDoomsdayInMonth = function(date) {
  const [year, month, day] = date.split('-');
  let leapYear = isLeapYear(year);
  const {month: newMonth, day: newDay} = monthToDoomsday(month, leapYear);
  return `${year}-${newMonth}-${newDay}`;
};

export let getFinalDayOfWeekFromDoomsday = function(monthDoomsday, date, anchorDay) {
  // Need to use UTC because standard time was implemented on Nov 19 1883
  // and this messes with the moment.diff calculation
  // https://en.wikipedia.org/wiki/Standard_time_in_the_United_States#:~:text=The%20history%20of%20standard%20time,standard%20time%20in%20time%20zones.
  let dayDiff = moment.utc(date).diff(moment.utc(monthDoomsday), 'days');

  let anchorNumber = +weekdayToNumber[anchorDay];

  dayDiff = (dayDiff + anchorNumber) % 7;
  if (dayDiff < 0) {
    dayDiff += 7;
  }

  return numberToWeekday[dayDiff + ''];
}

export let getWeekdayForDate = function(date) {
  let anchorDay = getAnchorDay(date);
  logger.explain(`The year's anchor day is ${anchorDay}`);

  let closestDoomsdayInMonth = getDoomsdayInMonth(date);
  logger.explain(`${closestDoomsdayInMonth} is a ${anchorDay}`);

  return getFinalDayOfWeekFromDoomsday(closestDoomsdayInMonth, date, anchorDay);
}

// Takes date in ISO String from (e.g. 2020-05-16)
export default function (date) {
  let weekday = getWeekdayForDate(date);
  logger.log(`${date} is a ${weekday}`);
}
