exports.getDCB32 = function getDCB32(decimal) {
  str = parseInt(decimal, 10).toString(2);
  // 0 padding
  while(str.length<32) {
    str = '0'+str;
  }
  return str;
};