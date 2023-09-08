/**
 * 初始化localStorage
 */
export const initItem = (key: string, defaultValue: string) => {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, defaultValue)
  }
}

/**
 * 从 localStroge 获取int值
 */
export const getIntDefault = (key: string, defaultValue: number) => {
  return Number(localStorage.getItem(key)) || defaultValue
}

/**
 * 从 localStroge 获取int值
 */
export const getInt = (key: string) => {
  return Number(localStorage.getItem(key))
}

/**
 * 保存的番茄钟数量：当天|总数
 */
export const saveItem = (key: string, value: string) => {
  localStorage.setItem(key, value)
}