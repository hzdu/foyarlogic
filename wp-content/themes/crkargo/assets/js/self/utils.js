//创建多行字符串
function heredoc(fn) {
  return fn.toString().split("\n").slice(1, -1).join("\n") + "\n";
}

//字符串格式化
/*
调用方式：
    var info = "我喜欢吃{0}，也喜欢吃{1}，但是最喜欢的还是{0},偶尔再买点{2}。";
    var msg=String.format(info , "苹果","香蕉","香梨")
    alert(msg);
    输出:我喜欢吃苹果，也喜欢吃香蕉，但是最喜欢的还是苹果,偶尔再买点香梨。
*/
String.format = function () {
  if (arguments.length == 0) return null;
  var str = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    var re = new RegExp("\\{" + (i - 1) + "\\}", "gm");
    str = str.replace(re, arguments[i]);
  }
  return str;
};

//小数点四舍五入
function mathRound(num, n) {
  var f = parseFloat(num);
  if (isNaN(f)) {
    return false;
  }
  f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂
  var s = f.toString();
  var rs = s.indexOf("."); //判定如果是整数，增加小数点再补0
  if (rs < 0) {
    rs = s.length;
    s += ".";
  }
  while (s.length <= rs + n) {
    s += "0";
  }
  return s;
}

/* 使用正则表达式来判断字符串是否全为空 */
function isEmpty(test) {
  if (test.match(/^\s+$/)) {
    return true;
  }
  if (test.match(/^[ ]+$/)) {
    return true;
  }
  if (test.match(/^[ ]*$/)) {
    return true;
  }
  if (test.match(/^\s*$/)) {
    return true;
  } else {
    return false;
  }
}

//保留两位小数 浮点数四舍五入 位数不够 不补0
//console.log(fomatFloat(3.12645,2)); // 3.13
//console.log(typeof fomatFloat(3.1415926)); //number
function formatFloat(src, pos=2) {
  return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}

// 只允许输入数字跟两位小数
function checkfloatnumber(obj) {
  obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
  obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
  obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
  obj.value = obj.value
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
}

// 只允许输入数字不带小数
function checkintnumber(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
    obj.value = obj.value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.*$/, "$1$2"); //只能输入两个小数
}

/**
 * 将当前日期按照YYYY-MM-DD格式化
 * @returns {string}
 */
 function getNowFormatDate(seperator="-") {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return year + seperator + month + seperator + strDate;
}

//检查日期控件中的日期格式是否正确
function checkdate(datecontrol) {
    dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;

    if (dateFormat.test(datecontrol)) {
        return true;
    } else {
        return false;
    }
}

// true:数值型的，false：非数值型
function checkIsNaN(value) {
    return typeof value === 'number' && !isNaN(value);
}