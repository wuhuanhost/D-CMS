/**
 * 数据校验器,统一校验前端提交的数据
 */
var validate = {

    init: function() {
        //初始化方法	

    },
    validate: function() {
        //校验方法

    }

};

/** 
 * 验证密码复杂度（必须包含数字字母） 
 * @param str 
 * @returns true:满足规则，false:不满足 
 */
function validateStr(str) {
    var reg1 = /^(([0-9]{1,})([a-z]{1,}))|(([a-z]{1,})([0-9]{1,}))$/;
    var reg2 = /^(([0-9]{1,})([A-Z]{1,}))|(([A-Z]{1,})([0-9]{1,}))$/;
    //var reg3 = /^([a-zA-Z]{0,})[0-9a-z-A-z]{0,}[~`!@#$%^&*.]{0,}$/; 
    str = valueTrim(str);
    //if(reg3.test(str)){ 
    // return true; 
    //} 
    if (reg1.test(str)) {
        return true;
    }
    if (reg2.test(str)) {
        return true;
    }
    return false;
}


/** 
 * 判断字符串长度 必须大于8位小于20位，一般用于密码 
 * @param str 字符串 
 * @returns 满足返回true 
 */
function valiDateLength(str) {
    if (str == null || str == '') {
        return false;
    }
    str = valueTrim(str);
    if (parseFloat(str.length) < 8) {
        return false;
    }
    if (parseFloat(str.length) > 20) {
        return false;
    }
    return true;
}
/** 
 * 验证时间 
 * @param dataValue 格式为：YYYY-MM-DD 
 * @returns 匹配返回true 不匹配返回false 
 */
function valiDate(dateValue) {
    var result = dateValue.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/);
    if (result == null) {
        return false;
    }
    return true;
}

/** 
 * 验证电话号码 
 * @param phoneValue 要验证的电话号码 
 * @returns 匹配返回true 不匹配返回false 
 */
function validatePhone(phoneValue) {
    phoneValue = valueTrim(phoneValue);
    var reg = /^[1][0-9]{10}$/;
    return reg.test(phoneValue);
}
/** 
 * 验证邮箱 
 * @param emailValue 要验证的邮箱 
 * @returns 匹配返回true 不匹配返回false 
 */
function validateEmail(emailValue) {
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(emailValue);
}
/** 
 * 判断是否是数字 
 * @param numberValue 要验证的数据 
 * @returns 匹配返回true 不匹配返回false 
 */
function isNumber(numberValue) {
    //定义正则表达式部分   
    var reg1 = /^[0-9]{0,}$/;
    var reg2 = /^[1-9]{1}[0-9]{0,}$/;
    //alert(numberValue); 
    if (numberValue == null || numberValue.length == 0) {
        return false;
    }
    numberValue = valueTrim(numberValue);
    //判断当数字只有1位时 
    if (numberValue.length < 2) {
        return reg1.test(numberValue);
    }
    return reg2.test(numberValue);;
}
/*** 
 * 金额 
 * @param value 
 * @returns 
 */
function isMoney(value) {
    if (value == '') {
        return false;
    }
    value = valueTrim(value);
    value = value.replace(/(^\s*)|(\s*$)/g, "");
    var reg = /^[0-9]*\.?[0-9]{0,2}$/;
    if (isNumber(value)) {
        return true;
    }
    if (value.length > 3) {
        if (value.substr(0, 1) == "0") {
            if (value.substr(3, value.length).length > 2) {
                return false;
            }
        }
    }
    return reg.test(value);
}


/** 
 * 验证是否是浮点数 
 * @param floatValue 要验证的数据 
 * @returns 匹配返回true 不匹配返回false 
 */
function isMyFloat(floatValue) {
    if (floatValue == '') {
        return false;
    }
    floatValue = valueTrim(floatValue);
    var reg = /^(\d+)(\.\d+)$/;
    if (isNumber(floatValue)) {
        return true;
    }
    if (floatValue.length > 3) {
        if (floatValue.substr(0, 1) == "0") {
            if (floatValue.substr(0, 2) != "0.") {
                return false;
            }
        }
    }
    return reg.test(floatValue);
}

//去掉字符串头尾空格   
function valueTrim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/** 
 * 检验18位身份证号码（15位号码可以只检测生日是否正确即可，自行解决） 
 * @param idCardValue 18位身份证号 
 * @returns 匹配返回true 不匹配返回false 
 */
function idCardVildate(cid) {
    var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //加权因子 
    var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2]; //校验码 
    var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (reg.test(cid)) {
        var sum = 0,
            idx;
        for (var i = 0; i < cid.length - 1; i++) {
            // 对前17位数字与权值乘积求和 
            sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
        }
        // 计算模（固定算法） 
        idx = sum % 11;
        // 检验第18为是否与校验码相等 
        return arrValid[idx] == cid.substr(17, 1).toUpperCase();
    } else {
        return false;
    }
}

/** 
 * 获取指定日期之前或之后的第几天 
 * @param dayCount 
 */
function getDateStr(dates, dayCount) {
    var dateTime = dayCount * 24 * 60 * 60 * 1000;
    var dd = new Date();
    if (dates == "") {
        dd = new Date();
    } else {
        dd = new Date(dates);
    }
    var dateNumber = dd.getTime() + dateTime;
    var newDate = new Date(dateNumber);
    var y = newDate.getFullYear();
    var m = newDate.getMonth() + 1; // 获取当前月份的日期 
    var d = newDate.getDate();
    if (m < 10) {
        m = "0" + m;
    }
    if (d < 10) {
        d = "0" + d;
    }
    return y + "-" + m + "-" + d;
}
/** 
 * 获取指定月份的之前或之后的第几个月 
 * @param dayCount 
 */
function getMonthStr(dates, monthCount) {
    var dd = new Date();
    if (dates == "") {
        dd = new Date();
    } else {
        dd = new Date(dates);
    }
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; // 获取当前月份的日期 
    m = m + monthCount;
    if (m == 0) {
        m = "12";
        y = y - 1;
    } else if (m < 10) {
        m = "0" + m;
    } else if (m > 12) {
        m = m - 12;
        m = "0" + m;
        y = y + 1;
    }
    return y + "-" + m;
}
/** 
 * 
 *对val值为undefined返回“”，否则返回原值 
 */
function dealNull(val) {
    if (typeof(val) == "undefined") {
        return "";
    } else {
        return val;
    }
}
