import { removeLoginStatus } from '@/utils/http'
import { LoaderFunction, redirect } from 'react-router-dom'

const loginLoader: LoaderFunction = async () => {
  if(localStorage.getItem('isLogin') === 'true') {
    return redirect('/')
  }
  removeLoginStatus()
  return Promise.resolve(null)
}

export default loginLoader
