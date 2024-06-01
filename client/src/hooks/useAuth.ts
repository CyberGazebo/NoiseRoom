import cookie from '../utils/cookie'

const KEY_NAME = 'auth_key'

/**
 * Хук для убодной авторизации
 *
 * @returns
 */
export const useAuth = () => {
  const login = (key: string) => cookie.set(KEY_NAME, key)
  const logout = () => cookie.delete(KEY_NAME)
  const isLogin = () => cookie.get(KEY_NAME)

  return { login, logout, isLogin }
}
