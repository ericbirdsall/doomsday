import assert from 'assert';
import moment from 'moment';
import {
  getAnchorDay,
  getDoomsdayInMonth,
  getWeekdayForDate,
} from '../doomsday.js';

import {isLeapYear} from '../is_leap_year.js';

describe('Doomsday', function () {
  describe('getAnchorDay', function () {
    it('should calculate year anchor days correctly', function () {
      let testDay = moment('1800-01-01');
      let lastDay = moment('2200-01-01');

      while(testDay.unix() < lastDay.unix()) {
        let yearAnchorDay = moment(testDay.format('YYYY') + '-04-04');
        assert.equal(getAnchorDay(testDay.format('YYYY-MM-DD')), yearAnchorDay.format('dddd'))
        testDay = testDay.add(1, 'year');
      }
    });
  });
  describe('isLeapYear', function () {
    it('should calculate leap years correctly', function () {
      for (let year = 0; year < 3000; year++) {
        assert.equal(moment([year]).isLeapYear(), isLeapYear(year));
      }
    });
  });
  describe('getDoomsdayInMonth', function () {
    it('should calculate closest Doomsday in month correctly', function () {
      let testDay = moment('1800-01-01');
      let lastDay = moment('2200-01-01');

      while(testDay.unix() < lastDay.unix()) {
        let yearAnchorDay = getAnchorDay(testDay.format('YYYY-MM-DD'));
        let monthAnchorDay = getDoomsdayInMonth(testDay.format('YYYY-MM-DD'));
        assert.equal(moment(monthAnchorDay).format('dddd'), yearAnchorDay)
        testDay = testDay.add(1, 'month');
      }
    });
  });
  describe('getWeekdayForDate', function () {
    it('should calculate the weekday of a given date', function () {
      let testDay = moment('1800-01-01');
      let lastDay = moment('2200-01-01');

      while (testDay.unix() < lastDay.unix()) {
        assert.equal(getWeekdayForDate(testDay.format('YYYY-MM-DD')), testDay.format('dddd'))
        testDay = testDay.add(1, 'day').startOf('day');
      }
    });
  });
});
