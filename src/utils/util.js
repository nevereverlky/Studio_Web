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