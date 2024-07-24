import ReactDOM from 'react-dom/client'
// import './index.css'
import 'virtual:uno.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './route.config.tsx'

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(<RouterProvider router={router} />)
