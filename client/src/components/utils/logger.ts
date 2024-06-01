export type ILoggerLevel = 'info' | 'warn' | 'error' | 'debug'

const clr = (level: ILoggerLevel) => {
  const c = {
    warn: '#ffff00',
    info: '#ff00ff',
    debug: '#00ffff',
    error: '#ff3600',
  }[level]

  return `color: ${c}`
}

const format = (message: any, level: ILoggerLevel) => {
  const format = '[%t] [%l] - [%m]'

  return format
    .replace('%t', new Date().toISOString())
    .replace('%l', level.toUpperCase())
    .replace('%m', message ?? '')
}

const _log = (m: any, level: ILoggerLevel) => {
  const msg = format(m, level)
  const color = clr(level)

  typeof m === 'object' || typeof m === 'function'
    ? console.log(`%c ${msg}`, color, m)
    : console.log(`%c ${msg}`, color)
}

export const LOG_DEBUG = (msg: any) => {
  process.env.NODE_ENV === 'development' && _log(msg, 'debug')
}

export const LOG_WARN = (msg: any) => _log(msg, 'warn')

export const LOG_INFO = (msg: any) => _log(msg, 'info')

export const LOG_ERROR = (msg: any) => _log(msg, 'error')
