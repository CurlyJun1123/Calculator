// 非空判断
function isEmpty(str) {
  switch (typeof str) {
    case 'undefined':
      return true;
    case 'string':
      if (str.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!str) return true;
      break;
    case 'number':
      if (0 === str || isNaN(str)) return true;
      break;
    case 'object':
      if (null === str || str.length === 0) return true;
      for (var i in str) {
        return false;
      }
      return true;
  }
  return false;
}

export default isEmpty
