const addZero = function (num, precision) {
  let str = num.toString();
  if (str.indexOf('.') < 0) {
    str += '.0';
  }
  let arr = str.split(".");
  let inte = arr[0];
  let decs = arr[1];
  let addLength = precision - decs.length;
  if (addLength > 0) {
    for (var i = 0; i < addLength; i++) {
      decs += "0";
    }
  }
  let final = inte + '.' + decs;
  return final;
};

const sign = function (val){
  return ( val < 0 ) ? - 1 : ( val > 0 ) ? 1 : 0;
};

const roundFn = function (fn, val, precision) {
  if (typeof val !== 'number') {
    throw new TypeError('Expected value must be a number');
  }
  if (typeof precision != 'number') {
    throw new TypeError('Expected precision must be an integer');
  }
  const exponent = precision > 0 ? 'e' : 'e-';
  const exponentNeg = precision > 0 ? 'e-' : 'e';
  precision = Math.abs(precision);
  if (fn === 'round') {
    //let num = Number(Math.sign(val) * (Math.round(Math.abs(val) + exponent + precision) + exponentNeg + precision));
    let num = Number(sign(val) * Math.round(Math.abs(val) + exponent + precision) + exponentNeg + precision);
    let finalStr = addZero(num, precision);
    return finalStr;
  }
  let outNum = Number(Math[fn](val + exponent + precision) + exponentNeg + precision);
  let finalStrNum = addZero(outNum, precision);
  return finalStrNum
};

const round = roundFn.bind(null, 'round');
const roundUp = roundFn.bind(null, 'ceil');
const roundDown = roundFn.bind(null, 'floor');

export default {round, roundUp, roundDown};