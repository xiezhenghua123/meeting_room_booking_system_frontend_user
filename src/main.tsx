import ReactDOM from 'react-dom/client'
// import './index.css'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
import'@/utils/rem'
import '@/locales'

import { router } from './route.config'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(router)