export type CookieOptions = {
  path?: string
  maxAge?: number
  domain?: string
  secure?: boolean
  httpOnly?: boolean
  expires?: Date | string
  sameSite?: boolean | 'lax' | 'strict' | 'none'
}

class Cookie {
  private cookieEnabled: boolean

  constructor() {
    this.cookieEnabled = navigator.cookieEnabled
    if (!this.cookieEnabled) console.error('Cookies is disabled.')
  }

  get(name: string) {
    if (!this.cookieEnabled) return undefined

    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
  }

  set(name: string, value: PrimitiveType, options?: CookieOptions) {
    if (!this.cookieEnabled) return

    options = {
      path: '/',
      sameSite: 'lax',
      secure: false,
      //@ts-ignore TODO
      domain: window.auth?.domain,
      ...options,
    }

    if (options.expires) {
      const time = new Date(options.expires)

      if (!isNaN(time.getTime())) options.expires = time
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
      value
    )}`

    for (const optionKey in options) {
      updatedCookie += `; ${optionKey}`
      const optionValue = options[optionKey as keyof CookieOptions]

      if (optionValue !== true) updatedCookie += `=${optionValue}`
    }

    document.cookie = updatedCookie
  }

  delete(name: string) {
    if (!this.cookieEnabled) return

    this.set(name, '', {
      expires: new Date(1),
    })
  }
}

const cookie = new Cookie()
export default cookie
