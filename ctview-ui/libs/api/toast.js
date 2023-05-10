/**
 * 显示消息提示框
 * @param {*} icon 值: success loading（支付宝小程序不支持） none
 * @param {*} mask 是否显示透明蒙层，防止触摸穿透，默认：false
 * @param {*} duration 提示的延迟时间，单位毫秒，默认：1500
 */
function showToast({ title = '', icon = 'none', mask = false, duration = 2000 } = {}) {
  return new Promise((resolve, reject) => {
    try {
      uni.showToast({ title, icon, mask, duration })
      setTimeout(() => {
        resolve()
      }, duration)
    } catch (e) {
      reject()
    }
  })
}

/**
 * 显示消息提示框
 * @param {*} icon 值: success loading none
 * @param {*} mask 是否显示透明蒙层，防止触摸穿透，默认：true
 * @param {*} duration 提示的延迟时间，单位毫秒，默认：1500
 */
function showLoading({ title = '正在加载...', mask = true } = {}) {
  return new Promise((resolve, reject) => {
    try {
      uni.showLoading({ title, mask })
      resolve()
    } catch (e) {
      reject()
    }
  })
}

/**
 * 显示模态弹窗，类似于标准 html 的消息框：alert、confirm。
 * @param {*} title 	String  否  提示的标题
 * @param {*} content  String  否  提示的内容
 * @param {*} showCancel  Boolean  否  是否显示取消按钮，默认为 true
 * @param {*} cancelText  String  否  取消按钮的文字，默认为"取消"，最多 4 个字符
 * @param {*} cancelColor  HexColor  否  取消按钮的文字颜色，默认为"#000000"
 * @param {*} confirmText  String  否  确定按钮的文字，默认为"确定"，最多 4 个字符
 * @param {*} confirmColor  HexColor  否  确定按钮的文字颜色，微信小程序平台默认为"#3CC51F"，百度小程序平台默认为"#3c76ff"
 * @param {*} editable  Boolean  否  是否显示输入框
 * @param {*} placeholderText  String  否  显示输入框时的提示文本
 * @param {*} success  Function  否  接口调用成功的回调函数
 * @param {*} fail  Function  否  接口调用失败的回调函数
 * @param {*} complete  Function  否  接口调用结束的回调函数（调用成功、失败都会执行）
 */
function showModal({
  title = '',
  content = '',
  showCancel = true,
  cancelText = '取消',
  cancelColor = '#1A1A1A',
  confirmText = '确定',
  confirmColor = '#1676F3',
  editable = false,
  placeholderText = '',
  success = (res) => {},
  fail = (res) => {}
} = {}) {
  uni.hideLoading()
  uni.showModal({ title, content, showCancel, cancelText, cancelColor, confirmText, confirmColor, editable, placeholderText, success, fail })
}

export default {
  showToast,
  showLoading,
  showModal
}
