// 添加url前缀
export const addPrefixToPath = (path: string) => {
  return `${import.meta.env.VITE_BASE_URL}${path}`
}

export const removePrefixToPath = (path: string) => {
  return path.replace(import.meta.env.VITE_BASE_URL, '')
}
