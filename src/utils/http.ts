import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { Loading } from './loading'
import { message } from 'antd'

type Result<T> = {
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
      (config: InternalRequestConfig) => {
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
      (response: ResponseConfig) => {
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
        const { code, message: msg } = error.response.data
        switch (code) {
          case 401:
            message.error(msg || '登录过期，请重新登录')
            break
          case 403:
            message.error(msg || '没有权限')
            break
          case 404:
            message.error(msg || '请求的资源不存在')
            break
          default:
            message.error(msg || '请求失败')
        }
        return Promise.reject(error)
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
    return <T = unknown, D = unknown>(params: D) => {
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
}
