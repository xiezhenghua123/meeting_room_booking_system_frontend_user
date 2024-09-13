import { ConfigProvider } from 'antd'
import theme from '@/theme'
import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs'
import { Outlet } from 'react-router-dom'

const pxToRem = px2remTransformer()

const NoCheckLayout = () => {
  return (
    <ConfigProvider theme={theme}>
      <StyleProvider transformers={[pxToRem]}>
        <Outlet></Outlet>
      </StyleProvider>
    </ConfigProvider>
  )
}

export default NoCheckLayout
