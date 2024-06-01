import axios, { AxiosError, AxiosInstance } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: window.domain + '/api/',
  headers: {
    'X-React': true,
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject(error)
    }

    // if (error.response.status === 401) boot.logout()

    const data: any = error.response.data

    if (data) {
      error.response.data =
        data.ExceptionMessage ||
        data.Message ||
        data.message ||
        data.ApiMessage ||
        data.Error
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
