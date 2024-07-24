import { Button, Form, Input } from 'antd'
import type { FormProps } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../api'

type FiledType = {
  username: string
  password: string
}

type LoginResponse = {
  userInfo: Record<string, unknown>
  accessToken: string
  refreshToken: string
}

const Login = () => {
  const location = useNavigate()
  const onFinish: FormProps<FiledType>['onFinish'] = async values => {
    const { data } = await login<LoginResponse, FiledType>({
      username: values.username,
      password: values.password
    })
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
    location('/')
  }
  return (
    <div className="flex flex-items-center flex-justify-center h-screen flex-col">
      <h1>会议室预订系统</h1>
      <Form
        autoComplete="off"
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className="w-2xl"
        size="large"
      >
        <Form.Item<FiledType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item<FiledType>
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
          className="mb-0"
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <div className="flex flex-justify-between">
            <Link to="/register">创建账号</Link>
            <Link to="/forget-password">忘记密码</Link>
          </div>
        </Form.Item>
        <Form.Item<FiledType> wrapperCol={{ offset: 12, span: 12 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
