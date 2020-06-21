import yargs from 'yargs';
import moment from 'moment';
import Doomsday from './doomsday.js';

import getWeekdayFromInput from './get_weekday_from_input.js';
import {numberToWeekday} from './constants.js';
import {getWeekdayForDate} from './doomsday.js';
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
  let baseDate = moment('1800-01-01');
  let random = Math.floor(Math.random() * (400 * 365));
  date = baseDate.add(random, 'days').format('YYYY-MM-DD')
  logger.log(date);
  let start = new Date();
  let answer = numberToWeekday[getWeekdayFromInput()];
  let end = new Date();
  logger.log(`Answered in ${moment(end).diff(start) / 1000} seconds`);
  let weekday = getWeekdayForDate(date);

  if (answer === weekday) {
    logger.log(`You were right! ${date} is a ${weekday}`);
  } else {
    logger.log(`You were wrong! ${date} is a ${weekday}`);
  }
}
// Doomsday(date);
