import { logout } from '@/api'
import { UserOutlined } from '@ant-design/icons'
import { Button, Spin } from 'antd'
import { Suspense } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

const HomeLayOut = () => {
  const navigate = useNavigate()
  const logOut = async () => {
    await logout()
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('isLogin')
    navigate('/no-check/login')
  }
  return (
    <div>
      {/* 导航栏 */}
      <div className="flex flex-justify-between flex-items-center border-b-style-solid border-b-1 border-slate-400 pt-4 px-12">
        <h1>会议室预订系统</h1>
        <div>
          <Link to="update-user-info" className='mr-4'>
            <UserOutlined className="text-3xl" />
          </Link>
          <Button type="primary" onClick={logOut}>
            退出登录
          </Button>
        </div>
      </div>
      {/* 内容区: Outlet就是vue-router的router-view */}
      <Suspense fallback={<Spin tip="加载中..." size="large" fullscreen />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default HomeLayOut
