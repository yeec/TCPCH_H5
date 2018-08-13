//比较日期
import moment from 'moment';
import { DATE_INITIAL_DATE, DATE_MAX_DURATION } from './../../constant/javascript/index';

const initalDate = moment(DATE_INITIAL_DATE);

const afterInitialDate = function (date) {
  return moment(date).isAfter(initalDate);
};

const beforeEndDate = function (date, endDate) {
  return moment(date).isBefore(moment(endDate));
};

const afterStartDate = function (date, startDate) {
  return moment(date).isAfter(moment(startDate));
};

const validDuration = function (startDate, endDate, duration = DATE_MAX_DURATION, unit = 'years') {
  return moment(startDate).isAfter(moment(endDate).subtract(duration, unit));
}

const beforeNow = function (date) {
  return moment(date).isBefore(moment());
}

export default {afterInitialDate, beforeEndDate, afterStartDate, validDuration, beforeNow}
