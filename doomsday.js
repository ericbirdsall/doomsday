// https://en.wikipedia.org/wiki/Doomsday_rule

import moment from 'moment';

const numberToWeekday = {
  '0': 'Sunday',
  '1': 'Monday',
  '2': 'Tuesday',
  '3': 'Wednesday',
  '4': 'Thursday',
  '5': 'Friday',
  '6': 'Saturday',
};

const weekdayToNumber = function(weekday) {
  let reversed = {}
  Object.keys(numberToWeekday).forEach(number => {
    reversed[numberToWeekday[number]] = number;
  });

  return +reversed[weekday];
}

const monthToDoomsday = function(month, leapYear) {
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

const anchorYears = {
  '1800': 5, // Friday
  '1900': 3, // Treblesday
  '2000': 2, // Tuesday
  '2100': 0, // Sunday
}

export let getAnchorDay = function(date) {
  let [year, month, day] = date.split('-');

  let lastTwoYearDigits = +year.substring(2);

  let yearFloor = Math.floor(lastTwoYearDigits / 12);
  let yearRemainder = lastTwoYearDigits % 12;
  let secondaryQuotient = Math.floor(yearRemainder / 4);
  // console.log(`A: Floor of ${lastTwoYearDigits} / 12: ${yearFloor}`);
  // console.log(`B: Remainder of above: ${yearRemainder}`);
  secondaryQuotient = secondaryQuotient % 7;
  // console.log(`C: Floor of above / 4: ${secondaryQuotient}`);
  let d = (yearFloor + yearRemainder + secondaryQuotient) % 7;

  // console.log(`D: Sum of above mod 7:  ${d}`);
  let anchor = year.substring(0, 2) + '00';

  let dayIndex = (d + anchorYears[anchor]) % 7;
  let doomsday = numberToWeekday[dayIndex];
  return doomsday;
}

/**
 * Calculates whether the given year is a leap year
 * @param {String} Year (YYYY)
 * @returns {Boolean} True if the given year is a leap year, otherwise false
*/
export let isLeapYear = function(year) {
  year = +year;
  if (year % 100 === 0) {
    return Math.floor(year / 400) === (year / 400);
  }
  return year % 4 === 0;
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
  let dayDiff = moment.utc(date).startOf('day').diff(moment.utc(monthDoomsday).startOf('day'), 'days');

  let anchorNumber = weekdayToNumber(anchorDay);

  dayDiff = (dayDiff + anchorNumber) % 7;
  if (dayDiff < 0) {
    dayDiff += 7;
  }

  return numberToWeekday[dayDiff + ''];
}

export let getWeekdayForDate = function(date) {
  // console.log('entered date', date)
  let anchorDay = getAnchorDay(date);
  // console.log(anchorDay)
  let closestDoomsdayInMonth = getDoomsdayInMonth(date);
  // console.log(closestDoomsdayInMonth);
  // console.log(`${closestDoomsdayInMonth} is a ${anchorDay}`);
  let answer = getFinalDayOfWeekFromDoomsday(closestDoomsdayInMonth, date, anchorDay);
  return answer;
}

// Takes date in ISO String from (e.g. 2020-05-16)
export default function (date) {
  let weekday = getWeekdayForDate(date);
  console.log(`${date} is a ${weekday}`);
}
