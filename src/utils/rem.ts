// rem响应式布局，设计稿宽度1440px, 根元素字体大小16px

const baseHeight = 1080
const baseFontSize = 16

const responsive = (baseHeight: number, baseFontSize: number) => {
  const scale = document.documentElement.clientHeight / baseHeight
  document.documentElement.style.fontSize =
    baseFontSize * Math.min(scale, 2) + 'px'
}

export const remToPx = (rem: number) => {
  return rem * parseFloat(document.documentElement.style.fontSize)
}

responsive(baseHeight, baseFontSize)
window.addEventListener('resize', () => {
  responsive(baseHeight, baseFontSize)
})
