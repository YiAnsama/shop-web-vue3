const KEY = 'shopping_user_info'

//获取信息
export const getInfo = () => {
  const result = localStorage.getItem(KEY)
  return result ? JSON.parse(result) : { token: '', userId: '' }
}

//设置信息
export const setInfo = (token, userId) => {
  localStorage.setItem(KEY, JSON.stringify({ token: token, userId: userId }))
}

//删除信息
export const removeInf = () => {
  localStorage.removeItem(KEY)
}
