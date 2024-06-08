const isUndefineOrNullOrEmpty = (v: unknown) => v === undefined || v === null || v === ''
const checkNumber =
  (min: number | (() => number), max: number | (() => number), name?: string) =>
  (rule: any, value: any, callback: any) => {
    if (isUndefineOrNullOrEmpty(value)) {
      return callback(new Error(name ? `请输入${name}` : '请输入'))
    }
    const localMax = max instanceof Function ? max() : max
    const localMin = min instanceof Function ? min() : min

    if (!Number.isInteger(value)) {
      callback(new Error(name ? `${name}只能为整数` : '请输入数字'))
    } else {
      if (value > localMax) {
        callback(new Error(name ? `${name}的值不能超过${localMax}` : `最大值为${localMax}`))
      } else if (value < localMin) {
        callback(new Error(name ? `${name}的值不能小于${localMin}` : `最小值为${localMin}`))
      } else {
        callback()
      }
    }
  }

const checkSelect = (name?: string) => (rule: any, value: any, callback: any) => {
  if (isUndefineOrNullOrEmpty(value)) {
    return callback(new Error(name ? `请选择${name}` : '请选择'))
  }
  callback()
}
const ipRegexp = /^((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))$/
const checkIp =
  (name = 'IP') =>
  (rule: any, value: any, callback: any) => {
    if (isUndefineOrNullOrEmpty(value)) {
      return callback(new Error(`请输入${name}`))
    }
    if (!ipRegexp.test(value)) {
      callback(new Error(`请输入正确的${name}`))
    } else {
      callback()
    }
  }
const checkString = (name?: string) => (rule: any, value: any, callback: any) => {
  if (isUndefineOrNullOrEmpty(value)) {
    return callback(new Error(name ? `请输人${name}` : '请输人'))
  }
  callback()
}
export default {
  checkNumber,
  checkSelect,
  checkIp,
  checkString
}
