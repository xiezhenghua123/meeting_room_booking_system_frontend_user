import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider
} from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ErrorPage from './pages/error-page/ErrorPage'
import loginAuthLoader from './loader/LoginAuth.loader'
import loginLoader from './pages/login/login.loader'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/index/home" />
  },
  {
    path: 'index',
    Component: lazy(() => import('@/pages/layout/Index')),
    loader: loginAuthLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        // path: 'index', //不能加这个path，否则会导致无法匹配到子路由
        index: true,
        element: <Navigate to="/index/home" />
      },
      {
        path: 'home',
        Component: lazy(() => import('@/pages/home/Home'))
      },
      {
        path: 'update-user-info',
        Component: lazy(() => import('@/pages/update-user-info/UpdateUserInfo'))
      },
      // 管理员相关路由
      {
        path: 'admin',
        Component: lazy(() => import('@/pages/menu/Menu')),
        children: [
          {
            index: true,
            element: <Navigate to="/index/admin/user-list" />
          },
          {
            path: 'user-list',
            Component: lazy(() => import('@/pages/user-manager/UserManager'))
          }
        ]
      }
    ]
  },
  {
    path: '/no-check',
    Component: lazy(() => import('@/pages/layout/no-check')),
    children: [
      {
        index: true,
        element: <Navigate to="/no-check/login" />
      },
      {
        path: 'login',
        Component: lazy(() => import('@/pages/login/Login')),
        loader: loginLoader
      },
      {
        path: 'update-password',
        Component: lazy(() => import('@/pages/update-password/UpdatePassword'))
      },
      {
        path: 'register',
        Component: lazy(() => import('@/pages/register/Register'))
      }
    ]
  }
]

export const history: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes)

export const router = (
  <Suspense>
    <RouterProvider router={history} />
  </Suspense>
)
