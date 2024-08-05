import { UserOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { Suspense } from 'react'
import { Outlet, Link } from 'react-router-dom'

const HomeLayOut = () => {
  return (
    <div>
      {/* 导航栏 */}
      <div className="flex flex-justify-between flex-items-center border-b-style-solid border-b-1 border-slate-400 pt-4 px-12">
        <h1>会议室预订系统</h1>
        <Link to="update-user-info">
          <UserOutlined className="text-3xl" />
        </Link>
      </div>
      {/* 内容区: Outlet就是vue-router的router-view */}
      <Suspense fallback={<Spin tip="加载中..." size="large" fullscreen />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default HomeLayOut
