import yargs from 'yargs';
import moment from 'moment';
import Doomsday from './doomsday.js';

import getWeekdayFromInput from './get_weekday_from_input.js';
import {numberToWeekday} from './constants.js';
import {getWeekdayForDate} from './doomsday.js';

yargs.boolean('quiz')
     .boolean('explain');

let date = yargs.argv._[0];
const quiz = yargs.argv.quiz;

if (quiz) {
  let baseDate = moment('1800-01-01');
  let random = Math.floor(Math.random() * (400 * 365));
  date = baseDate.add(random, 'days').format('YYYY-MM-DD')
  console.log(date);
  let start = new Date();
  let answer = numberToWeekday[getWeekdayFromInput()];
  let end = new Date();
  console.log(`Answered in ${moment(end).diff(start) / 1000} seconds`);
  let weekday = getWeekdayForDate(date);

  if (answer === weekday) {
    console.log(`You were right! ${date} is a ${weekday}`);
  } else {
    console.log(`You were wrong! ${date} is a ${weekday}`);
  }
}
// Doomsday(date);
