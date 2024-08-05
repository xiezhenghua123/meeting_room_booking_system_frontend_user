import { checkLogin } from '@/api'
import { LoaderFunction, redirect } from 'react-router-dom'

const loginLoader: LoaderFunction = async () => {
  const data = await checkLogin<boolean>()
  if (data.data) {
    return redirect('/')
  }
  return Promise.resolve(data)
}

export default loginLoader
