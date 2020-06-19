import readline from 'readline-sync';

export default function getWeekdayFromInput() {
  return readline.question('What weekday is this?\n');
}
