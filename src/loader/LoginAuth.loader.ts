import { checkLogin } from '@/api'
import Cookies from 'js-cookie'
import { LoaderFunction, redirect } from 'react-router-dom'

const loginLoader: LoaderFunction = async () => {
  try {
    // 第三方登录回调
    const userInfo = Cookies.get('userInfo')
    const accessToken = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')
    if (userInfo && accessToken && refreshToken) {
      localStorage.setItem('userInfo', userInfo)
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('isLogin', 'true')
      Cookies.remove('userInfo')
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
    }
    const data = await checkLogin<boolean>()
    return Promise.resolve(data)
  } catch (error) {
    redirect('/no-check/login')
  }
}

export default loginLoader
