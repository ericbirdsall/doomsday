import readline from 'readline-sync';
import {numberToWeekday} from './constants.js';
import logger from './logger.js';

const line = '~~~~~~~~~~~~';

export default function getWeekdayFromInput() {
  const options = Object.keys(numberToWeekday).map(key => `\x1b[36m${key}\x1b[0m  ${numberToWeekday[key]}`);
  logger.log(Array.prototype.concat(line, ...options, line).join('\n'));
  return readline.question('What weekday is this?\n');
}
