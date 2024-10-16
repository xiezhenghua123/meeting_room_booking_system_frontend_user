import { checkLogin } from '@/api'
import { LoaderFunction, redirect,  } from 'react-router-dom'

const loginLoader:LoaderFunction = async () => {
  try {
    const data = await checkLogin<boolean>()
    return Promise.resolve(data)
  } catch (error) {
    redirect('/no-check/login')
  }
}

export default loginLoader
