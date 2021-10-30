import qs from 'qs'

export function localStorageSet(key, value, ttl) {
  localStorage.setItem(key, qs.stringify({
    value: value,
    exp: new Date(new Date().getTime() + ttl).getTime()
  }))
}

export function localStorageGet(key) {
  // 若过期则删除
  const data = qs.parse(localStorage.getItem(key))
  if (data !== null) {
    if (data.exp != null && data.exp < new Date().getTime()) {
      localStorage.removeItem(key)
    } else {
      return data.value
    }
  }
  return null
}

export function messageInfo(that, message, type) {
  return that.$message({
    message: message,
    type: type
  })
}

export function parseTime(time, cFormat) {
  if (!time) {
    return '暂无时间'
  }
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}