const checkNumber =
  (min: number | (() => number), max: number | (() => number), name?: string) =>
  (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(name ? `请输入${name}` : '请输入'))
    }
    const localMax = max instanceof Function ? max() : max
    const localMin = min instanceof Function ? min() : min

    if (!Number.isInteger(value)) {
      callback(new Error(name ? `${name}只能为数字` : '请输入数字'))
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
  if (!value) {
    return callback(new Error(name ? `请选择${name}` : '请选择'))
  }
}
export default {
  checkNumber,
  checkSelect
}
