import {
  set,
  format,
  isDate,
  isValid,
  parseISO,
  intervalToDuration,
} from 'date-fns'

import i18n from '../i18n'
import { t } from 'i18next'
import { ru, enUS, az } from 'date-fns/locale'

import { SupportedFormat } from '../constants/dateFormat'

type DateString = Date | string
type DateAny = DateString | number

type FormatKey = keyof Duration
type FormatArg = ((msDiff: number) => FormatKey[]) | FormatKey[]

const locales: { [key: string]: Locale } = {
  ru: ru,
  en: enUS,
  az: az,
}

// current app locale
const locale = locales[i18n.language] ?? enUS

const defaultFormat: FormatKey[] = ['days', 'hours', 'minutes']

const autoKeys = {
  days: t('common.shortDate.days'),
  hours: t('common.shortDate.hours'),
  minutes: t('common.shortDate.minutes'),
  seconds: t('common.shortDate.seconds'),
}

const getShortDuration = (duration: Duration, format = defaultFormat) => {
  const arr = format.reduce<string[]>((arr, val) => {
    const v = duration[val]
    return v ? [...arr, `${v} ${(autoKeys as any)[val]}`] : arr
  }, [])

  return arr.join(' ')
}

/**
 * Возвращает время прошеднее между датами
 * @returns 1 д. 5 ч. 17 мин.
 */
export const formatInterval = (
  from: DateAny,
  to: DateAny,
  format: FormatArg = defaultFormat
) => {
  const start = new Date(from)
  const end = new Date(to)

  const formats =
    typeof format === 'function'
      ? format(Math.abs(start.getTime() - end.getTime()))
      : format

  const durations = intervalToDuration({
    start,
    end,
  })

  return getShortDuration(durations, formats)
}

/**
 * Возвращает время прошедшее от указанной даты до текущего времени
 * @returns 1 д. 5 ч. 17 мин.
 */
export const formatDateToNow = (
  from: DateString,
  format: FormatArg = defaultFormat
) => {
  const start = new Date(from)
  return formatInterval(start, new Date(), format)
}

/**
 * Возвращает время прошедшее от текущего момента до указанной даты
 * @returns 1 д. 5 ч. 17 мин.
 */
export const formatNowToDate = (to: DateString, format?: FormatArg) => {
  const end = new Date(to)
  return formatInterval(new Date(), end, format)
}

/**
 * Функция форматирования времени
 *
 * @param date
 * @param dateFormat `default: dd.MM.yyyy HH:mm`
 * @param failed
 * @returns
 */
export const dateISOformat = (
  date?: DateString | null,
  dateFormat: SupportedFormat = 'dd.MM.yyyy HH:mm',
  failed?: string
) => {
  if (!date) return failed ?? ''
  const parsed = isDate(date) ? (date as Date) : parseISO(date as string)
  const valid = isValid(parsed)
  return valid ? format(parsed, dateFormat, { locale }) : failed ?? ''
}

const now = new Date()

export const defaultDate = {
  startDate: set(now, {
    hours: 0,
    minutes: 0,
    seconds: 0,
  }),
  endDate: set(now, {
    hours: 23,
    minutes: 59,
    seconds: 0,
  }),
}

/**
 * Возвращает дату без времени
 *
 * @example
 *
 * dateWithoutTime('2023-08-30T07:52:12.427Z') -> '2023-08-30Z'
 *
 * @param date
 * @param failed
 * @returns
 */
export const dateWithoutTime = (date?: DateString | null, failed?: string) => {
  if (!date) return failed ?? ''

  const parsed = isDate(date) ? (date as Date).toISOString() : (date as string)
  return parsed.split('T')[0] + 'Z'
}
