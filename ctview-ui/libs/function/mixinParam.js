// 整合路由参数
function mixinParam(url, params) {
  // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
  // 如果有url中有get参数，转换后无需带上"?"
  let query = ''
  if (/.*\/.*\?.*=.*/.test(url)) {
    // object对象转为get类型的参数
    query = uni.$ct.queryParams(params, false)
    // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
    return (url += '&' + query)
  } else {
    // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
    query = uni.$ct.queryParams(params)
    return (url += query)
  }
}

export default mixinParam
