//格式化时间
const format2Four = function (num) {
  let str = num.toString();
  if (str.indexOf('.') < 0) {
    str += '.0000';
  }
  let arr = str.split(".");
  let inte = arr[0];
  let decs = arr[1];
  let addLength = 4 - decs.length;
  if (addLength > 0) {
    for (var i = 0; i < addLength; i++) {
      decs += "0";
    }
  }
  let final = inte + '.' + decs;
  return final;
};

export default format2Four;