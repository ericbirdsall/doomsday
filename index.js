import yargs from 'yargs';
import Doomsday from './doomsday.js';

let date = yargs.argv._[0];

Doomsday(date);

