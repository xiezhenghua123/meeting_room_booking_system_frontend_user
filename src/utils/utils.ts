// 添加url前缀
export const addPrefixToPath = (path: string) => {
  if(path.startsWith('http'))  return path
  return `${import.meta.env.VITE_BASE_URL}${path}`
}

export const removePrefixToPath = (path: string) => {
  if(!path.startsWith('http')) return path
  return path.replace(import.meta.env.VITE_BASE_URL, '')
}
