import axiosInstance from './axios'
import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { t } from 'i18next'
import { toast } from 'react-hot-toast'
import FILES from '../constants/files'

import downloadFile, { downloadBlobFile } from '../utils/downloadFile'

type Success<T> = {
  data: T
  error: null
  code: number
}

type Failed = {
  data: null
  error: string
  code: number
}

type ExtraAxiosRequestConfig<T> = AxiosRequestConfig & {
  /**
   * Флаг для отправки формы.
   * Когда `true` собирает все данные из `params` в `FormData`
   */
  requestTypeForm?: boolean

  /**
   * Функция для мапинга ответа
   *
   * @param data
   * @returns
   */
  responseTransformer?: (data?: T) => T | undefined

  /**
   * Функция для мапинга запроса
   *
   * @param data
   * @returns
   */
  requestTransformer?: (data?: T) => Partial<T> | undefined
}

type ExtraAxiosRequestFileConfig = AxiosRequestConfig & {
  fileType?: keyof typeof FILES
}

export type RequestResult<T> = Success<T> | Failed

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

//TODO: Сделать LongPulling
type LongPulling<T> = {
  Data: T
  Message: string
  RequestId: string
  ProgressState: number
  ProgressValue: number
  Status:
    | 'InProgress'
    | 'Error'
    | 'Success'
    | 'ErrorRequestValidation'
    | 'ErrorExceedMaximumActiveRequest'
}

class Transport {
  public baseURL = axiosInstance.defaults.baseURL
  private fetchApi = axiosInstance

  // просто обертки для переноса старого апи
  public GET = <T>(url: string, options?: ExtraAxiosRequestConfig<T>) => {
    if (url.endsWith('/')) url = url.slice(0, -1)
    return this.preRequest<T>('GET', url, options)
  }

  public POST = <T>(url: string, options?: ExtraAxiosRequestConfig<T>) =>
    this.preRequest<T>('POST', url, options)

  public PUT = <T>(url: string, options?: ExtraAxiosRequestConfig<T>) =>
    this.preRequest<T>('PUT', url, options)

  public DELETE = <T>(url: string, options?: ExtraAxiosRequestConfig<T>) =>
    this.preRequest<T>('DELETE', url, options)

  public DOWNLOAD_BLOB = (url: string, options?: ExtraAxiosRequestFileConfig) =>
    this.downloadBlob(url, options)

  private preRequest = <T>(
    method: RequestMethod,
    url: string,
    options?: ExtraAxiosRequestConfig<T>
  ) => {
    if (options?.requestTypeForm) {
      const form = new FormData()
      Object.entries(options.params).forEach(([key, value]) => {
        Array.isArray(value)
          ? value.forEach((val) => form.append(key, val as any))
          : form.append(key, value as any)
      })

      delete options.params
      delete options.requestTypeForm
      options.data = form
    }

    if (options?.requestTransformer && options.data) {
      options.data = options.requestTransformer(options.data)
      delete options.requestTransformer
    }

    const config = Object.assign(options ?? {}, { url, method })
    return this.request<T>(config)
  }

  private request = async <T>(config: ExtraAxiosRequestConfig<T>) => {
    return this.fetchApi
      .request(config)
      .then((response: AxiosResponse<T>) => {
        const code = response.status
        const data = config.responseTransformer
          ? config.responseTransformer(response.data)
          : response.data

        return <RequestResult<T>>{ data, error: null, code }
      })
      .catch((error: AxiosError<string>) => {
        const code = error.response?.status ?? -1

        if (code === 401)
          return <RequestResult<T>>{
            data: null,
            error: error.response?.data || error.message,
            code,
          }

        if (code !== 403)
          toast.error(
            `Code: ${error.code}. ${t(`common.responseCodes.${code}`)}`,
            {
              duration: 5000,
              position: 'bottom-left',
            }
          )
        console.error(error)
        return <RequestResult<T>>{
          data: null,
          error: error.response?.data || error.message,
          code,
        }
      })
  }

  private downloadBlob = async (
    url: string,
    options?: ExtraAxiosRequestFileConfig
  ) => {
    return this.fetchApi
      .request({ url, responseType: 'blob', ...options })
      .then((response) => {
        downloadBlobFile(response)

        return <RequestResult<boolean>>{
          data: true,
          error: null,
        }
      })
      .catch((error: AxiosError<string>) => {
        const code = error.response?.status ?? -1

        toast.error(
          `Code: ${error.code}. ${t(`common.responseCodes.${code}`)}`,
          {
            duration: 5000,
            position: 'bottom-left',
          }
        )
        console.error(error)
        return <RequestResult<boolean>>{
          data: null,
          error: error.response?.data || error.message,
          code,
        }
      })
  }
}

const transport = new Transport()

export type TransportType = typeof transport
export default transport
