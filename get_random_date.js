import moment from 'moment';

export const getRandomDate = function () {
  const baseDate = moment('1800-01-01');
  const random = Math.floor(Math.random() * (400 * 365));
  return baseDate.add(random, 'days').format('YYYY-MM-DD');
}
