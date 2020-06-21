import assert from 'assert';
import moment from 'moment';
import {
  getAnchorDay,
  getDoomsdayInMonth,
  getWeekdayForDate,
} from '../doomsday.js';

import {isLeapYear} from '../is_leap_year.js';
import {monthToDoomsday} from '../month_to_doomsday.js';

describe('Doomsday', function () {
  describe('getAnchorDay', function () {
    it('should calculate year anchor days correctly', function () {
      let testDay = moment('1800-01-01');
      const lastDay = moment('2200-01-01');

      while(testDay.unix() < lastDay.unix()) {
        const yearAnchorDay = moment(testDay.format('YYYY') + '-04-04');
        assert.strictEqual(getAnchorDay(testDay.format('YYYY-MM-DD')), yearAnchorDay.format('dddd'))
        testDay.add(1, 'year');
      }
    });
  });
  describe('isLeapYear', function () {
    it('should calculate leap years correctly', function () {
      for (let year = 0; year < 3000; year++) {
        assert.strictEqual(moment([year]).isLeapYear(), isLeapYear(year));
      }
    });
  });
  describe('monthToDoomsday', function () {
    it('should calculate Doomsday for a given month and leap year', function () {
      assert.deepEqual(monthToDoomsday('01', false), {month: '01', day: '03'}, 'Doomsday is Jan 3 in regular years');
      assert.deepEqual(monthToDoomsday('01', true), {month: '01', day: '04'}, 'Doomsday is Jan 4 in leap years');
      assert.deepEqual(monthToDoomsday('02', false), {month: '02', day: '28'}, 'Doomsday is Feb 28 in regular years');
      assert.deepEqual(monthToDoomsday('02', true), {month: '02', day: '29'}, 'Doomsday is Feb 29 in leap years');
      assert.deepEqual(monthToDoomsday('03', false), {month: '02', day: '28'}, 'Doomsday is Feb 28 in regular years');
      assert.deepEqual(monthToDoomsday('03', true), {month: '02', day: '29'}, 'Doomsday is Feb 29 in leap years');
      assert.deepEqual(monthToDoomsday('04', true), {month: '04', day: '04'}, 'Doomsday is Apr 4 in any year');
      assert.deepEqual(monthToDoomsday('05', true), {month: '05', day: '09'}, 'Doomsday is May 9 in any year');
      assert.deepEqual(monthToDoomsday('06', true), {month: '06', day: '06'}, 'Doomsday is Jun 6 in any year');
      assert.deepEqual(monthToDoomsday('07', true), {month: '07', day: '11'}, 'Doomsday is Jul 11 in any year');
      assert.deepEqual(monthToDoomsday('08', true), {month: '08', day: '08'}, 'Doomsday is Aug 8 in any year');
      assert.deepEqual(monthToDoomsday('09', true), {month: '09', day: '05'}, 'Doomsday is Sep 5 in any year');
      assert.deepEqual(monthToDoomsday('10', true), {month: '10', day: '10'}, 'Doomsday is Oct 10 in any year');
      assert.deepEqual(monthToDoomsday('11', true), {month: '11', day: '07'}, 'Doomsday is Nov 7 in any year');
      assert.deepEqual(monthToDoomsday('12', true), {month: '12', day: '12'}, 'Doomsday is Dec 12 in any year');

      assert.throws(() => monthToDoomsday('13'));
      assert.throws(() => monthToDoomsday(undefined));
    });
  });
  describe('getDoomsdayInMonth', function () {
    it('should calculate closest Doomsday in month correctly', function () {
      let testDay = moment('1800-01-01');
      const lastDay = moment('2200-01-01');

      while(testDay.unix() < lastDay.unix()) {
        const yearAnchorDay = getAnchorDay(testDay.format('YYYY-MM-DD'));
        const monthAnchorDay = getDoomsdayInMonth(testDay.format('YYYY-MM-DD'));
        assert.strictEqual(moment(monthAnchorDay).format('dddd'), yearAnchorDay)
        testDay.add(1, 'month');
      }
    });
  });
  describe('getWeekdayForDate', function () {
    it('should calculate the weekday of a given date', function () {
      let testDay = moment('1800-01-01');
      const lastDay = moment('2200-01-01');

      while (testDay.unix() < lastDay.unix()) {
        assert.strictEqual(getWeekdayForDate(testDay.format('YYYY-MM-DD')), testDay.format('dddd'))
        testDay.add(1, 'day');
      }
    });
  });
});
