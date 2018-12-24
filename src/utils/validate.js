/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  return str.length > 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

// 邮箱验证
export function checkEmail(rule, value, callback) {
  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  if (!value) {
    return callback(new Error('邮箱不能为空'))
  }
  setTimeout(() => {
    if (mailReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱格式'))
    }
  }, 100)
}

// 身份证验证
export function checkIDCard(rule, value, callback) {
  // 15位数身份证验证正则表达式：
  var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/

  // 18位数身份证验证正则表达式 ：
  var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
  setTimeout(() => {
    if (isIDCard1.test(value) || isIDCard2.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的身份证号码'))
    }
  }, 100)
}
// 手机号验证
export function checkMobile(rule, value, callback) {
  var _d = /^1[3578][01379]\d{8}$/g // 电信号码
  var _l = /^1[34578][01256]\d{8}$/g // 联通号码
  var _y = /^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/g // 移动号码
  setTimeout(() => {
    if (_d.test(value) || _l.test(value) || _y.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的手机号码'))
    }
  }, 100)
}
// 匹配两位小数以内的整数
export function checkNumber(rule, value, callback) {
  var patrn = /^\d+(\.\d{1,2})?$/
  setTimeout(() => {
    if (patrn.test(value)) {
      callback()
    } else {
      callback(new Error('请填写整数或2位小数'))
    }
  }, 100)
}
// 匹配正整数
export function checkPositiveNumber(rule, value, callback) {
  var patrn = /^[1-9]\d*$/
  setTimeout(() => {
    if (patrn.test(value)) {
      callback()
    } else {
      callback(new Error('请填写正整数'))
    }
  }, 100)
}

export function checkPwd(rule, value, callback) {
  var patrn = /^[^\u4E00-\u9FA5\uF900-\uFA2D\u0020]{6,16}$/
  setTimeout(() => {
    if (patrn.test(value)) {
      callback()
    } else {
      callback(new Error('请填写6-16位字符，不能包含空格、中文'))
    }
  }, 100)
}

// 字符长度校验
export function checkStringLength (rule, value, callback) {
  let newVal = value.replace(/\s+/g, '')
  setTimeout(() => {
    if (newVal.length > rule.strLength) {
      callback(new Error(`最多可输入${rule.strLength}字符`))
    }
    else {
      callback()
    }
  }, 100)
}
