//获取日期
import DateFormat from './date-format';

const delSepFormat = 'yyyyMMdd';

const getDateWithSep = function (dateWithOutSep) {
  let date = '';
  let year = dateWithOutSep.slice(0, 4);
  let month = dateWithOutSep.slice(4, 6);
  let day = dateWithOutSep.slice(6, 8);
  if (dateWithOutSep) {
    date = year + '-' + month + '-' + day;
    return date;
  }
};

const getDateWithoutSep = function (dateWithSep) {
  let date = '';
  let dateStamp = new Date(dateWithSep).getTime();
  if (dateStamp) {
    date = DateFormat.date(dateStamp, delSepFormat);
    return date;
  }
};

const getCurrentDate = function () {
  let date = new Date();
  let seperator = "-";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  let currentdate = date.getFullYear() + seperator + month + seperator + strDate;
  return currentdate;
};

export default {getDateWithSep, getDateWithoutSep, getCurrentDate};