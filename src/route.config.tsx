import { RouteObject } from 'react-router-dom'
import Home from './pages/home/Home'
import ErrorPage from './pages/error-page/ErrorPage'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import UpdatePassword from './pages/update-password/UpdatePassword'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'update-password',
    element: <UpdatePassword />
  }
]

export default routes
