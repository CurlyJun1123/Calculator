// 交互反馈 参照 https://uniapp.dcloud.io/api/ui/prompt.html
import toast from './libs/api/toast.js'

// post类型对象参数转为get类型url参数
import queryParams from './libs/function/queryParams.js'

// 节流方法
import throttle from './libs/function/throttle.js'
// 防抖方法
import debounce from './libs/function/debounce.js'
// 节流方法
import mixinParam from './libs/function/mixinParam.js'

// 非空判断
import isEmpty from './libs/function/isEmpty.js'
// 规则检验
import test from './libs/function/test.js'
// 日期处理
import dayjs from './libs/utils/day.js'

const $ct = { ...toast, queryParams, throttle, debounce, mixinParam, isEmpty, test, dayjs }

// $ct挂载到uni对象上
uni.$ct = $ct
