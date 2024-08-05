import { useForm } from 'antd/es/form/Form'
import { Button, Col, Form, Input, message, Row, FormProps } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { register, registerCaptcha } from '../../api'
import { useCallback } from 'react'
import SendCaptcha from '../../components/send-captcha/SendCpatcha';

type RegisterFiledType = {
  username: string
  nickName: string
  password: string
  confirmPassword: string,
  email: string
  captcha: string
}

const Register = () => {
  const [form] = useForm<RegisterFiledType>()
  
  const navigate = useNavigate()

  const onFinish: FormProps<RegisterFiledType>['onFinish'] = async values => {
    const { username, nickName, password, confirmPassword, email, captcha } =
      values
    if (password !== confirmPassword) {
      message.error('两次密码不一致')
      return
    }
    await register<string, Omit<RegisterFiledType, 'confirmPassword'>>({
      username,
      nickName,
      password,
      email,
      captcha
    })
    navigate('/login')
  }
  const sendCaptcha = useCallback(async () => {
    const email = form.getFieldValue('email')
    if (!email) {
      message.error('请输入邮箱')
      return Promise.reject()
    }
    await registerCaptcha({
      address: email
    })
  }, [form])
  return (
    <div className="flex flex-items-center flex-justify-center h-screen flex-col ">
      <h1>会议室预订系统</h1>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className="w-2xl"
        size="large"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<RegisterFiledType>
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名'
            }
          ]}
        >
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item<RegisterFiledType>
          label="昵称"
          name="nickName"
          rules={[
            {
              required: true,
              message: '请输入昵称'
            }
          ]}
        >
          <Input placeholder="昵称" />
        </Form.Item>
        <Form.Item<RegisterFiledType>
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码'
            }
          ]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item<RegisterFiledType>
          label="确认密码"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: '请输入确认密码'
            }
          ]}
        >
          <Input.Password placeholder="确认密码" />
        </Form.Item>
        <Form.Item<RegisterFiledType>
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: '请输入邮箱'
            }
          ]}
        >
          <Input placeholder="邮箱" />
        </Form.Item>
        <Form.Item<RegisterFiledType>
          label="验证码"
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码'
            }
          ]}
        >
          <Row className="flex flex-justify-between">
            <Col span={16}>
              <Input placeholder="验证码" />
            </Col>
            <Col span={6}>
              <SendCaptcha sendCaptcha={sendCaptcha} />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <div className="flex w-full flex-justify-end">
            <Link to="/login">已有账号？去登陆</Link>
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button className="w-full" type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
