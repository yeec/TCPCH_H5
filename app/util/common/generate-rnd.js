//随机数
const generateRandom = (length = 10) => {
  var x = "0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  var tmp = "";
  for (var i = 0; i < length; i++) {
    tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
  }
  return tmp;
};

export default generateRandom;