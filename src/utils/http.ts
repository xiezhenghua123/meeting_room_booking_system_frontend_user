import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { Loading } from './loading'
import { message } from 'antd'
import { history } from '@/route.config'
import { refreshToken } from '../api/index'

export type Result<T> = {
  code: number
  data: T
  message: string
}

type OtherConfig = {
  loading?: boolean
  successMessage?: string
  errorMessage?: string
}

type InternalRequestConfig = InternalAxiosRequestConfig & OtherConfig

type ResponseConfig = AxiosResponse & {
  config: InternalRequestConfig
}

type RequestConfig<D = any> = AxiosRequestConfig<D> & OtherConfig

const loadingInstance = new Loading()

type refreshTokenType = {
  accessToken: string
  refreshToken: string
}

// 双token刷新
export const refreshTokenInstance = async () => {
  const refreshTokenString = localStorage.getItem('refreshToken')
  const { data } = await refreshToken<
    refreshTokenType,
    { refresh_token: string | null }
  >({
    refresh_token: refreshTokenString
  })
  localStorage.setItem('accessToken', data.accessToken)
  localStorage.setItem('refreshToken', data.refreshToken)
}

// 去除登录状态
export const removeLoginStatus = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('userInfo')
  localStorage.removeItem('isLogin')
}

export class Http {
  instance: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create({
      timeout: import.meta.env.VITE_TIMEOUT,
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      },
      ...config
    })
    this.instance.interceptors.request.use(
      async (config: InternalRequestConfig) => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }

        const loading = config.loading
        if (loading) {
          loadingInstance.showLoading()
        }
        return config
      },
      async error => {
        if (error.config.loading) {
          loadingInstance.hideLoading()
        }
        if (error.config.errorMessage) {
          message.error(error.config.errorMessage || '请求失败')
        }
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      async (response: ResponseConfig) => {
        const { config } = response
        const loading = config.loading
        if (loading) {
          loadingInstance.hideLoading()
        }
        if (config.successMessage) {
          message.success(config.successMessage)
        }
        return response.data
      },
      async error => {
        if (error.config.loading) {
          loadingInstance.hideLoading()
        }
        try {
          const { code, message: msg } = error.response.data
          switch (code) {
            // 刷新token
            case 401:
              if (!error.config.url.includes('/user/refresh')) {
                return refreshTokenInstance().then(() => {
                  return this.instance.request(error.config)
                })
              }
              message.error(msg || '登录过期，请重新登录')
              removeLoginStatus()
              history.navigate('/no-check/login')
              break
            case 403:
              message.error(msg || '登录失效，请重新登录')
              removeLoginStatus()
              history.navigate('/no-check/login')
              break
            case 404:
              message.error(msg || '请求的资源不存在')
              break
            case 500:
              message.error(msg || '服务器错误')
              break
            default:
              message.error(msg || '请求失败')
          }
          return Promise.reject(error)
        } catch (e) {
          message.error('请求失败')
          return Promise.reject(error)
        }
      }
    )
  }

  private requestBase<T, D>(config: RequestConfig<D>): Promise<Result<T>> {
    return this.instance.request<T, Result<T>>(config)
  }

  request(configBase: RequestConfig) {
    return <T = unknown, D = unknown>(data?: D) => {
      return this.requestBase<T, D>({
        ...configBase,
        data
      })
    }
  }

  get(url: string, config?: RequestConfig) {
    return <T = unknown, D = unknown>(params?: D) => {
      return this.requestBase<T, D>({
        url,
        method: 'get',
        params,
        ...config
      })
    }
  }

  post(url: string, config?: RequestConfig) {
    return <T = unknown, D = unknown>(data?: D) => {
      return this.requestBase<T, D>({
        url,
        method: 'post',
        data,
        ...config
      })
    }
  }

  put(url: string, config?: RequestConfig) {
    return <T = unknown, D = unknown>(data?: D) => {
      return this.requestBase<T, D>({
        url,
        method: 'put',
        data,
        ...config
      })
    }
  }

  delete(url: string, config?: InternalAxiosRequestConfig) {
    return <T = unknown, D = unknown>(data?: D) => {
      return this.requestBase<T, D>({
        url,
        method: 'delete',
        data,
        ...config
      })
    }
  }

  upload(url: string, config?: RequestConfig) {
    return <T = unknown, D = unknown>(data?: D) => {
      return this.requestBase<T, D>({
        url,
        method: 'post',
        data,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        ...config
      })
    }
  }
}
