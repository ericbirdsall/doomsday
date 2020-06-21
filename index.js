import yargs from 'yargs';
import moment from 'moment';
import Doomsday from './doomsday.js';

import getWeekdayFromInput from './get_weekday_from_input.js';
import {numberToWeekday} from './constants.js';
import {getWeekdayForDate} from './doomsday.js';
import {getRandomDate} from './get_random_date.js';
import logger from './logger.js';

yargs.boolean('quiz')
     .boolean('explain');

let date = yargs.argv._[0];
const quiz = yargs.argv.quiz;
const explain = yargs.argv.explain;

if (explain) {
  global.explain = true;
}

if (quiz) {
  date = getRandomDate();
  logger.log(date);

  let start = new Date();
  let answer = numberToWeekday[getWeekdayFromInput()];
  let end = new Date();

  logger.log(`Answered in ${moment(end).diff(start) / 1000} seconds`);
  let weekday = getWeekdayForDate(date);
  logger.log(`You were ${answer === weekday ? 'right' : 'wrong'}! ${date} is a ${weekday}`);
} else {
  Doomsday(date);
}
