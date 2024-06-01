import transport from './transport'

class Api {
  private transport = transport

  baseURL = transport.baseURL
}

const api = new Api()
export default api
