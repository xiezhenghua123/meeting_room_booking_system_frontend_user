import { useForm } from 'antd/es/form/Form'
import { Button, Col, Form, Input, message, Row, FormProps, Select } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { register, registerCaptcha } from '../../api'
import { useCallback } from 'react'
import SendCaptcha from '../../components/send-captcha/SendCpatcha'
import { useTranslation } from 'react-i18next'
import leftPng from '@/assets/images/login-register/left.png'
import rightPng from '@/assets/images/login-register/right.png'
import useLanguage from '@/hooks/useLanguage'

type RegisterFiledType = {
  password: string
  confirmPassword: string
  email: string
  captcha: string
}

const Register = () => {
  const { t } = useTranslation()

  const [form] = useForm<RegisterFiledType>()

  const navigate = useNavigate()

  const onFinish: FormProps<RegisterFiledType>['onFinish'] = async values => {
    const { password, confirmPassword, email, captcha } = values
    if (password !== confirmPassword) {
      message.error('两次密码不一致')
      return
    }
    await register<string, Omit<RegisterFiledType, 'confirmPassword'>>({
      password,
      email,
      captcha
    })
    navigate('/no-check/login')
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

  // 多语言
  const { language, languageArr, changeLanguage } = useLanguage()

  return (
    <div className="w-screen h-screen flex relative">
      <div className="flex-1 h-full relative bg-[#ECBC76]">
        <span className="absolute top-[2.33rem] left-[3.15rem] font-sans text-2xl font-bold text-[#C6553B]">
          {t('websiteName')}
        </span>
      </div>
      <div className="flex-1 h-full bg-[#FFFEF9]">
        <div className="float-right mt-8 mr-8 text-1.2rem">
          <span>{t('language')}：</span>
          <Select
            options={languageArr}
            defaultValue={language}
            style={{ width: '7.5rem' }}
            onChange={changeLanguage}
          ></Select>
        </div>
      </div>
      <div className="w-[40.4rem] flex flex-col justify-center left-50% top-5rem bottom-5rem translate-x-[-50%] absolute bg-[#fff] rounded-[3rem] pt-2rem pl-3.3rem pr-3.3rem">
        <div className="absolute w-fit top-[8.5rem] left-[-20.175rem]">
          <img src={leftPng} alt="" className="w-[20.175rem] rotate-y-180" />
          <div className="absolute left-0 right-0 bottom-1 h-px bg-[#000]"></div>
        </div>
        <img
          src={rightPng}
          alt=""
          className="w-33.75rem absolute right-[-30.75rem] top-5rem"
        />
        <div className="flex items-center justify-between">
          <span className="text-1.5rem">{t('welcome')}</span>
          <div className="text-1.2rem">
            <span className="text-[#8D8D8D]">{t('hasAccount')}</span>
            <Link
              className="text-[#B87514] mt-0.5rem cursor-pointer block no-underline"
              to="/no-check/login"
            >
              {t('login')}
            </Link>
          </div>
        </div>
        <div className="text-4.125rem font-500 mt-0.5rem">{t('register')}</div>
        <Form
          form={form}
          autoComplete="off"
          onFinish={onFinish}
          layout="vertical"
          className="mt-3.12rem"
          size="large"
        >
          <Form.Item<RegisterFiledType>
            label={t('passwordPlaceholder')}
            name="password"
            rules={[
              {
                required: true,
                message: t('inputRequired', { field: t('passwordPlaceholder') })
              }
            ]}
          >
            <Input.Password allowClear  placeholder={t('passwordLabel')} />
          </Form.Item>
          <Form.Item<RegisterFiledType>
            label={t('confirmPassword')}
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: t('inputRequired', { field: t('confirmPassword') })
              }
            ]}
          >
            <Input.Password allowClear  placeholder={t('confirmPasswordLabel')} />
          </Form.Item>
          <Form.Item<RegisterFiledType>
            label={t('usernamePlaceholder')}
            name="email"
            rules={[
              {
                required: true,
                message: t('inputRequired', { field: t('usernamePlaceholder') })
              },
              {
                type: 'email',
                message: t('inputValid', { field: t('usernamePlaceholder') })
              }
            ]}
          >
            <Input allowClear  placeholder={t('usernamePlaceholder')} />
          </Form.Item>
          <Form.Item<RegisterFiledType>
            label={t('captcha')}
            name="captcha"
            rules={[
              {
                required: true,
                message: t('inputRequired', { field: t('captcha') })
              }
            ]}
          >
            <Row className="flex flex-justify-between">
              <Col span={16}>
                <Input allowClear  placeholder={t('captcha')} />
              </Col>
              <Col span={6}>
                <SendCaptcha className={"h-full bg-[#E48700] text-[1.2rem]"} sendCaptcha={sendCaptcha} />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item className='mt-2.92639rem'>
            <Button
              type="primary"
              className="w-full h-4.05rem bg-[#E48700] text-[1.2rem]"
              htmlType="submit"
            >
              {t('register')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
