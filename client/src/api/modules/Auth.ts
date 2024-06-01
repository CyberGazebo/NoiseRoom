import cookie from '../../utils/cookie'
import { TransportType } from '../transport'

export type IAuth = {
  username: string
  password: string
}

export class Auth {
  private transport: TransportType
  private path = '/auth'

  constructor(transport: TransportType) {
    this.transport = transport
  }

  /**
   * Авторизирует пользователя
   *
   * @param params
   * @returns
   */
  login(params: IAuth) {
    return this.transport.POST(this.path + '/login', { data: params })
  }

  /**
   * Деавторизирует пользователя
   *
   * @returns
   */
  logout() {
    const key = cookie.get('key')
    return this.transport.POST(this.path + '/logout', { data: key })
  }
}
