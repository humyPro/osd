import type { FormInstance } from 'element-plus'
import { useI18n } from 'vue-i18n'
import util from '../util'

interface ValidationHelpers {
  /**
   * 检查数字
   * @param min 最小值
   * @param max 最大值
   * @param name 字段名
   * @param int 是否是整数
   * @returns
   */
  checkNumber: (
    min: number | (() => number),
    max: number | (() => number),
    name?: string,
    int?: boolean
  ) => (rule: any, value: any, callback: any) => void

  /**
   * 检查选择框
   * @param name 字段名
   * @returns
   */
  checkSelect: (name?: string) => (rule: any, value: any, callback: any) => void
  /**
   * 检查IP类型的字段
   * @param name 字段名
   * @returns
   */
  checkIp: (name?: string) => (rule: any, value: any, callback: any) => void
  /**
   * 检查字符串输入框
   * @param name 字段名
   * @returns
   */
  checkString: (name?: string) => (rule: any, value: any, callback: any) => void
  validateForm: (
    form: FormInstance,
    validCallback?: () => void,
    invalidCallback?: () => void
  ) => void
}

export default function useFormValidation(): ValidationHelpers {
  const { t } = useI18n()

  const isUndefinedOrNullOrEmpty = (v: unknown): boolean =>
    v === undefined || v === null || v === ''

  const checkNumber =
    (
      min: number | (() => number),
      max: number | (() => number),
      name?: string,
      int: boolean = true
    ) =>
    (rule: any, value: any, callback: any) => {
      if (isUndefinedOrNullOrEmpty(value)) {
        return callback(
          new Error(name ? t('validation.enter', { field: name }) : t('validation.required'))
        )
      }

      const localMax = typeof max === 'function' ? max() : max
      const localMin = typeof min === 'function' ? min() : min

      if (int && !Number.isInteger(Number(value))) {
        callback(
          new Error(name ? t('validation.integerOnly', { field: name }) : t('validation.integer'))
        )
      } else if (Number(value) > localMax) {
        callback(
          new Error(
            name
              ? t('validation.maxValueWithField', { field: name, max: localMax })
              : t('validation.maxValue', { max: localMax })
          )
        )
      } else if (Number(value) < localMin) {
        callback(
          new Error(
            name
              ? t('validation.minValueWithField', { field: name, min: localMin })
              : t('validation.minValue', { min: localMin })
          )
        )
      } else {
        callback()
      }
    }

  const checkSelect = (name?: string) => (rule: any, value: any, callback: any) => {
    if (isUndefinedOrNullOrEmpty(value)) {
      return callback(
        new Error(name ? t('validation.select', { field: name }) : t('validation.requiredSelect'))
      )
    }
    callback()
  }

  const ipRegexp = /^((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))$/

  const checkIp =
    (name: string = 'IP') =>
    (rule: any, value: any, callback: any) => {
      if (isUndefinedOrNullOrEmpty(value)) {
        return callback(new Error(t('validation.enter', { field: name })))
      }
      if (!ipRegexp.test(value)) {
        callback(new Error(t('validation.validIp', { field: name })))
      } else {
        callback()
      }
    }

  const checkString = (name?: string) => (rule: any, value: any, callback: any) => {
    if (isUndefinedOrNullOrEmpty(value)) {
      return callback(
        new Error(name ? t('validation.enter', { field: name }) : t('validation.required'))
      )
    }
    callback()
  }

  const validateForm = (
    form: FormInstance,
    validCallback?: () => void,
    invalidCallback?: () => void
  ) => {
    form.validate((valid) => {
      if (valid) {
        validCallback?.()
      } else {
        invalidCallback ? invalidCallback() : util.showMessage(t('validation.formInvalid'), 'error')
      }
    })
  }

  return {
    checkNumber,
    checkSelect,
    checkIp,
    checkString,
    validateForm
  }
}
