//校验工具类
const validateHK = function (str) {
  var reg = /^[\u4e00-\u9fa5]{0,40}$|^[\d\s\-\+\.\/\(\)\:\?\,\\A-Za-z]{0,120}$/;
  return reg.test(str);
};

const validateOther = function (str) {
  var reg = /^[\d\s\-\+\.\/\(\)\:\?\,\\A-Za-z]{5,140}$/;
  return reg.test(str);
};

const validateZero = function (str) {
  return str === "0";
};

const get4decs = function (str) {
  let inte = str.split(".")[0];
  let dec = str.split(".")[1].substr(0, 4);
  return inte + "." + dec + "%";
}

const validateGreaterBalance = function (amount, avaBal) {
  if (!isNaN(parseInt(amount)) && !isNaN(parseInt(avaBal))) {
    let A = parseInt(amount);
    let B = parseInt(avaBal);
    return A > B;
  }
}

const getRound4Digits = function (str) {
  return parseFloat(str).toFixed(2) + "%";
};

export default {validateHK, validateOther, validateZero, get4decs, validateGreaterBalance, getRound4Digits};