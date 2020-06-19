import yargs from 'yargs';
import moment from 'moment';
import Doomsday from './doomsday.js';

import getWeekdayFromInput from './get_weekday_from_input.js'

yargs.boolean('quiz');

let date = yargs.argv._[0];
const quiz = yargs.argv.quiz;

if (quiz) {
  let baseDate = moment('1800-01-01');
  let random = Math.floor(Math.random() * (400 * 365));
  date = baseDate.add(random, 'days').format('YYYY-MM-DD')
  console.log(date);
  let start = new Date();
  let answer = getWeekdayFromInput();
  let end = new Date();
  console.log(`Answered in ${moment(end).diff(start) / 1000} seconds`);
}
Doomsday(date);
