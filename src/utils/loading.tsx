import ReactDOM from 'react-dom/client'
import { Spin } from 'antd'

// 全局加载动画
export class Loading {
  // 请求数量
  private requestCount = 0

  constructor() {
    this.requestCount = 0
  }
  showLoading() {
    if (this.requestCount === 0) {
      const loading = document.createElement('div')
      loading.setAttribute('id', 'loading')
      document.body.appendChild(loading)
      const render = ReactDOM.createRoot(loading)
      render.render(<Spin tip="加载中..." size="large" fullscreen />)
    }
    this.requestCount++
  }
  hideLoading() {
    this.requestCount--
    if (this.requestCount === 0) {
      const loading = document.getElementById('loading')
      if (loading) {
        document.body.removeChild(loading)
      }
    }
  }
}
