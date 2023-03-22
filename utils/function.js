import { round } from './digit'

/**
 * @description 数字格式化
 * @param {number|string} number 要格式化的数字
 * @param {number} decimals 保留几位小数
 * @param {string} decimalPoint 小数点符号
 * @param {string} thousandsSeparator 千分位符号
 * @returns {string} 格式化后的数字
 */
export const priceFormat = (number, decimals = 0, decimalPoint = '.', thousandsSeparator = ',') => {
  const numberReplace = `${number}`.replace(/[^0-9+-Ee.]/g, '')
  const n = !isFinite(+numberReplace) ? 0 : +numberReplace
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = typeof thousandsSeparator === 'undefined' ? ',' : thousandsSeparator
  const dec = typeof decimalPoint === 'undefined' ? '.' : decimalPoint
  let s = []

  s = (prec ? round(n, prec) + '' : `${Math.round(n)}`).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, `$1${sep}$2`)
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
 * @description 非空判断 可判断所有类型
 * @param {any} str 要判断的数据
 * @returns {boolean} 判断后的结果
 */
export const isEmpty = (str) => {
  switch (typeof str) {
    case 'undefined':
      return true
    case 'string':
      if (str.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true
      break
    case 'boolean':
      if (!str) return true
      break
    case 'number':
      if (0 === str || isNaN(str)) return true
      break
    case 'object':
      if (null === str || str.length === 0) return true
      for (const _i in str) {
        return false
      }
      return true
    default:
      return false
  }
  return false
}
