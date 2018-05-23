function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getweek(date)
{
  var aWeek = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      iWeek = new Date(date.replace("-", "/")).getDay();
  return aWeek[iWeek];
}

function changeMoneyToYi(money) {
  money = parseInt(money.replace(/,/g, "")) / 100000000;
  return Math.floor(money * 100) / 100;
}

function splitCode(code)
{
  var aCodes = code.split("|");
  var aRedCodes = aCodes[0].split(",");
  var aBlueCodes = aCodes[1].split(",");
  return {
    red : aRedCodes,
    blue:aBlueCodes
  };
}
function checkType(str, type)
{
  return new RegExp(/\[object (.*?)\]/).exec(Object.prototype.toString.call(str).toLowerCase())[1] === type;
}

module.exports = {
  formatTime: formatTime,
  splitCode: splitCode,
  getweek: getweek,
  changeMoneyToYi: changeMoneyToYi,
  checkType: checkType
}
