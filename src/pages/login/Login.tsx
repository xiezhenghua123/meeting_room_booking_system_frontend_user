import { login } from '@/api'
import { Button, Form, Input, Select } from 'antd'
import type { FormProps } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import leftPng from '@/assets/images/login-register/left.png'
import rightPng from '@/assets/images/login-register/right.png'
import googleIcon from '@/assets/images/login-register/google.svg'
import facebookIcon from '@/assets/images/login-register/facebook.svg'
import twitterIcon from '@/assets/images/login-register/twitter.svg'
import { useState } from 'react'
import useLanguage from '@/hooks/useLanguage'

type FiledType = {
  username: string
  password: string
}

type LoginResponse = {
  userInfo: Record<string, unknown>
  accessToken: string
  refreshToken: string
}

const googleLogin = () => {
  window.location.href = `${import.meta.env.VITE_BASE_URL}user/google-login`
}
const facebookLogin = () => {}
const twitterLogin = () => {}
const initThirdPartyLoginArr = [
 {
   icon: googleIcon,
   text: 'loginWithGoogle',
   callback: googleLogin,
   active: true
 },
 {
   icon: facebookIcon,
   text: 'loginWithFacebook',
   callback: facebookLogin,
   active: false
 },
 {
   icon: twitterIcon,
   text: 'loginWithTwitter',
   callback: twitterLogin,
   active: false
 }
]

const Login = () => {
  const { t } = useTranslation()
  const location = useNavigate()
  const onFinish: FormProps<FiledType>['onFinish'] = async values => {
    const { data } = await login<LoginResponse, FiledType>({
      username: values.username,
      password: values.password
    })
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
    // 设置登录状态
    localStorage.setItem('isLogin', 'true')
    const isAdmin = data.userInfo.isAdmin
    if (isAdmin) {
      location('/index/admin')
    } else {
      location('/')
    }
  }

  // 第三方登录
  const [thirdPartyLoginArr, setThirdPartyLoginArr] = useState(
    initThirdPartyLoginArr
  )
  const changeThirdPartyStatus = (index: number) => {
    const arr = thirdPartyLoginArr.map((item, i) => {
      if (i === index) {
        item.active = true
      } else {
        item.active = false
      }
      return item
    })
    setThirdPartyLoginArr(arr)
  }

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
        <div className='float-right mt-8 mr-8 text-1.2rem'>
         <span>{t('language')}：</span>
         <Select options={languageArr} defaultValue={language} style={{width: '7.5rem'}} onChange={changeLanguage}></Select>
        </div>
      </div>
      {/* 多语言 */}
      <div className="w-[40.4rem]  left-50% top-5.87rem bottom-6.05rem translate-x-[-50%] absolute bg-[#fff] rounded-[3rem] pt-3.9rem pl-3.3rem pr-3.3rem pb-3.8rem">
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
            <span className="text-[#8D8D8D]">{t('noAccount')}</span>
            <Link className="text-[#B87514] mt-0.5rem cursor-pointer block no-underline" to="/no-check/register">
              {t('register')}
            </Link>
          </div>
        </div>
        <div className="text-4.125rem font-500 mt-0.5rem">{t('login')}</div>
        <Form
          autoComplete="off"
          onFinish={onFinish}
          layout="vertical"
          className="mt-3.12rem"
          size="large"
        >
          <Form.Item<FiledType>
            name="username"
            label={t('usernameLabel')}
            rules={[
              {
                required: true,
                message: t('inputRequired', {
                  field: t('usernamePlaceholder')
                })
              }
            ]}
          >
            <Input
              className="mt-0.5rem"
              placeholder={t('usernamePlaceholder')}
            />
          </Form.Item>
          <Form.Item<FiledType>
            name="password"
            label={t('passwordLabel')}
            rules={[
              {
                required: true,
                message: t('inputRequired', {
                  field: t('passwordPlaceholder')
                })
              }
            ]}
            className="mb-0"
          >
            <Input.Password
              className="mt-0.5rem"
              placeholder={t('passwordPlaceholder')}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <div className="flex flex-justify-end">
              <Link
                to="/no-check/update-password"
                className="text-0.975rem cursor-pointer"
              >
                {t('forgotPassword')}
              </Link>
            </div>
          </Form.Item>
          <Form.Item<FiledType>>
            <Button
              type="primary"
              className="w-full h-4.05rem bg-[#E48700] text-[1.2rem] "
              htmlType="submit"
            >
              {t('login')}
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center text-1.2rem text-[#ABABAB]">{t('or')}</div>
        {/* 底部第三方登录 */}
        <div className="flex mt-2.3rem">
          {thirdPartyLoginArr.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex rounded-[0.675rem] cursor-pointer h-4.5rem flex items-center justify-center basis-4.5rem not-last:mr-1.5rem transition-all bg-[#F6F6F6] overflow-hidden ${
                  item.active ? 'bg-[#FFF4E3] flex-1' : ''
                }`}
                onClick={item.callback}
                onMouseEnter={() => changeThirdPartyStatus(index)}
              >
                <img src={item.icon} alt="" className="w-1.95rem shrink" />
                <span
                  className={`text-1.2rem ml-1.2rem text-#B87514 whitespace-nowrap transition-all delay-200 ${
                    item.active ? 'inline-block' : 'hidden'
                  }`}
                >
                  {t(item.text)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Login
