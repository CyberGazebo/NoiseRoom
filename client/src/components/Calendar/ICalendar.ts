import { CSSObject } from 'styled-components'
import { onChangeEventType } from '../../../hooks'

export type ICalendarMonthType = 'prev' | 'current' | 'next'

export type ICalendarAnimDirection = 'left' | 'right' | 'top' | 'bottom' | ''

export interface ICalendar {
  name: string

  /**
   * Стили
   */
  sx?: CSSObject

  /**
   * Минимальная дата
   */
  minDate?: DateISOString

  /**
   * Максимальная дата
   */
  maxDate?: DateISOString

  /**
   * Значение
   */
  value?: string

  /**
   * Отключение года
   */
  isYearDisabled?: boolean

  /**
   * Часы минуты
   */
  isTimeSelector?: boolean

  /**
   * Изменение месяца/года по скроллу колесеком
   */
  isScollChange?: boolean

  /**
   * Изменения
   */
  onChange?: (
    event: onChangeEventType<string> & { target: { ignore?: boolean } }
  ) => void
}

export interface ICalendarDays {
  time: Date
  day: number
  disabled: boolean
  type: ICalendarMonthType
}
