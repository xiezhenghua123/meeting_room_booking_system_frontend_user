import { Form, Input, Button, message, Row, Col } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { FormProps } from 'antd'
import { useNavigate } from 'react-router-dom'

import { updatePassword, updatePasswordCaptcha } from '../../api'
import SendCaptcha from '@/components/send-captcha/SendCpatcha'

type UpdatePasswordFiledType = {
  password: string
  confirmPassword: string
  email: string
  captcha: string
}
const UpdatePassword = () => {
  const [form] = useForm<UpdatePasswordFiledType>()

  const navigate = useNavigate()
  const onFinish: FormProps<UpdatePasswordFiledType>['onFinish'] =
    async values => {
      const { password, confirmPassword, email, captcha } = values
      if (password !== confirmPassword) {
        message.error('两次密码不一致')
        return
      }
      await updatePassword<
        string,
        Omit<UpdatePasswordFiledType, 'confirmPassword'>
      >({
        password,
        email,
        captcha
      })
      navigate('/login')
    }

  const sendCaptcha = async () => {
    const email = form.getFieldValue('email')
    if (!email) {
      message.error('请输入邮箱')
      return Promise.reject()
    }
    await updatePasswordCaptcha({
      email
    })
  }

  return (
    <div className="flex flex-items-center flex-justify-center h-screen flex-col">
      <h1>会议室预订系统</h1>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        size="large"
        className="w-2xl"
        autoComplete="off"
      >
        <Form.Item<UpdatePasswordFiledType>
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
        <Form.Item<UpdatePasswordFiledType>
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
        <Form.Item<UpdatePasswordFiledType>
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
        <Form.Item<UpdatePasswordFiledType>
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
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary" className="w-full" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpdatePassword
