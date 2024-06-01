import { useEffect, useId, useMemo, useState } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { isValid, addMonths, addYears, set } from 'date-fns'

import Icon from '../Icon'
import { useTranslation } from 'react-i18next'

import {
  Day,
  Year,
  Month,
  Header,
  DaysWeek,
  Container,
  HeaderBox,
  Controller,
  DaysWrapper,
  DaysWrapperOverflow,
} from './SCalendar'

import Tooltip from '../Tooltip'
import FieldContainer from '../FieldContainer'
import ComboBox from '../ComboBox'
import {
  ICalendarAnimDirection,
  ICalendar,
  ICalendarDays,
  ICalendarMonthType,
} from './ICalendar'
import { Text } from '../Base/commonPresets'

type ClickType = 'prev' | 'next'

/**
 * **Календарь.**
 *
 * В пропсе `onChange` дата возвращается в формате `ISODate`
 */
const Calendar: React.FC<ICalendar> = ({
  sx,
  name,
  value = '',
  minDate,
  maxDate,
  isScollChange = true,
  isTimeSelector = false,
  isYearDisabled = false,
  onChange = () => {},
}) => {
  const id = useId()
  const { t } = useTranslation()

  const shortDaysWeek = t('common.calendar.shortDaysWeek', {
    returnObjects: true,
  }) as Array<string>

  const monthNames = t('common.calendar.monthNames', {
    returnObjects: true,
  }) as Array<string>

  const stringToDate = (str: string) => new Date(Date.parse(str))

  const toggleAnimTrigger = () => setAnimTrigger((p) => !p)

  const [animDir, setAnimDir] = useState<ICalendarAnimDirection>('')
  const [animTrigger, setAnimTrigger] = useState(true)
  const [stateDate, setStateDate] = useState(
    value && isValid(value) ? stringToDate(value) : new Date()
  )

  useEffect(() => {
    const unformat = Date.parse(value)
    if (!isNaN(unformat) && isValid(unformat)) {
      setStateDate(stringToDate(value))
    }
  }, [value])

  /**
   * Генерирует дни для заполнения
   * @returns
   */
  const calendarDays = useMemo(() => {
    const [year, month] = [stateDate.getFullYear(), stateDate.getMonth() + 1]

    const prevMonthDays = new Date(year, month - 1, 0).getDate()
    const currMonthDays = new Date(year, month, 0).getDate()
    const firstDay = new Date(year, month - 1, 1).getDay()
    const firstWeekDay = firstDay === 0 ? firstDay + 7 : firstDay

    let [startNextMonthDay, startCurrMonthDay] = [1, 1]

    const generatedDays = []

    for (let index = 0; index < 42; index++) {
      let gen = {} as ICalendarDays

      if (index < firstWeekDay - 1) {
        const day = prevMonthDays - firstWeekDay + 2 + index
        gen = {
          day,
          disabled: true,
          type: 'prev',
          time: new Date(year, month - 2, day),
        }
      } else if (index < currMonthDays + firstWeekDay - 1) {
        const day = startCurrMonthDay++
        gen = {
          day,
          disabled: false,
          type: 'current',
          time: new Date(year, month - 1, day),
        }
      } else {
        const day = startNextMonthDay++
        gen = {
          day,
          disabled: true,
          type: 'next',
          time: new Date(year, month, day),
        }
      }

      generatedDays.push(gen)
    }

    return generatedDays
  }, [animTrigger])

  /**
   * Вспомогательная функция для запуска анимации.
   * Дергает триггер для анимации и коллбэк
   * @param direction направление анимации
   * @param func коллбэк
   */
  const animateCalendar = (
    direction: ICalendarAnimDirection,
    func: VoidFunction
  ) => {
    setAnimDir(direction)
    setTimeout(() => {
      toggleAnimTrigger()
      func()
    }, 100)
  }

  /**
   * Обрабатывает клик по стрелочкам месяца
   */
  const onClickMonthHandler = (clickType: ClickType) => {
    animateCalendar(clickType === 'next' ? 'right' : 'left', () => {
      const addOrSub = clickType === 'next' ? 1 : -1
      setStateDate((prevDate) => addMonths(prevDate, addOrSub))
    })
  }

  /**
   * Обрабатывает клик по стрелочкам года
   */
  const onClickYearHandler = (clickType: ClickType) => {
    animateCalendar(clickType == 'next' ? 'top' : 'bottom', () => {
      const addOrSub = clickType === 'next' ? 1 : -1
      setStateDate((prevDate) => addYears(prevDate, addOrSub))
    })
  }

  /**
   * Обрабатывает выбор дня
   */
  const onChangeDateHandler = (
    type: ICalendarMonthType,
    date: Date,
    ignore?: boolean
  ) => {
    if (!isDayDisabled(date)) {
      const valueDate = new Date(value)
      const valid = isValid(valueDate)

      const year = isYearDisabled
        ? { year: valid ? valueDate.getFullYear() : 0 }
        : {}

      const minutesHours = !isTimeSelector
        ? {
            hours: valid ? valueDate.getHours() : 0,
            minutes: valid ? valueDate.getMinutes() : 0,
          }
        : {}

      const newDate = set(date, {
        ...year,
        ...minutesHours,
        seconds: valid ? valueDate.getSeconds() : 0,
      })

      onChange({ target: { name, value: newDate.toISOString(), ignore } })

      if (type === 'next' || type === 'prev') {
        animateCalendar(type === 'next' ? 'right' : 'left', () =>
          setStateDate(date)
        )
      } else {
        setStateDate(date)
      }
    }
  }

  /**
   * Можно ли выбрать этот день?
   * Ответит на этот вопрос.
   */
  const isDayDisabled = (date: Date) => {
    const curr = date.getTime()
    const min =
      minDate && isValid(new Date(minDate))
        ? stringToDate(minDate).getTime()
        : 0

    const max =
      maxDate && isValid(new Date(maxDate))
        ? stringToDate(maxDate).getTime()
        : Number.MAX_SAFE_INTEGER

    return curr <= min || curr >= max
  }

  /**
   * Скролл месяца/года
   *
   * @param param0
   * @param type
   * @returns
   */
  const onWheelHandler = (
    { deltaY }: React.WheelEvent,
    type: 'month' | 'year'
  ) => {
    if (!isScollChange) return

    const handler = type === 'month' ? onClickMonthHandler : onClickYearHandler
    deltaY < 0 ? handler('prev') : handler('next')
  }

  return (
    <Container expanded={isTimeSelector} sxStyle={sx}>
      <Header>
        <HeaderBox onWheel={(e) => onWheelHandler(e, 'month')}>
          <Tooltip content={t('common.calendar.prevMonth')}>
            <Controller
              isPrev={true}
              onClick={() => onClickMonthHandler('prev')}>
              <Icon size={10} name='#arrow' />
            </Controller>
          </Tooltip>
          <Month>{monthNames[stateDate.getMonth()]}</Month>
          <Tooltip content={t('common.calendar.nextMonth')}>
            <Controller
              isPrev={false}
              onClick={() => onClickMonthHandler('next')}>
              <Icon size={10} name='#arrow' />
            </Controller>
          </Tooltip>
        </HeaderBox>
        {!isYearDisabled && (
          <HeaderBox onWheel={(e) => onWheelHandler(e, 'year')}>
            <Tooltip content={t('common.calendar.prevYear')}>
              <Controller
                isPrev={true}
                onClick={() => onClickYearHandler('prev')}>
                <Icon size={10} name='#arrow' />
              </Controller>
            </Tooltip>
            <Year>{stateDate.getFullYear()}</Year>
            <Tooltip content={t('common.calendar.nextYear')}>
              <Controller
                isPrev={false}
                onClick={() => onClickYearHandler('next')}>
                <Icon size={10} name='#arrow' />
              </Controller>
            </Tooltip>
          </HeaderBox>
        )}
      </Header>

      <DaysWeek>
        {shortDaysWeek.map((day) => (
          <div key={day + id}>{day}</div>
        ))}
      </DaysWeek>

      <DaysWrapperOverflow>
        <SwitchTransition mode='out-in'>
          <CSSTransition
            key={String(animTrigger)}
            timeout={200}
            classNames='fade'>
            <DaysWrapper animationDirection={animDir}>
              {calendarDays.map(({ day, disabled, type, time }) => (
                <Day
                  key={id + time.toString()}
                  isDisabled={isDayDisabled(time)}
                  notCurrent={disabled}
                  selected={time.toDateString() === stateDate.toDateString()}
                  onClick={() => onChangeDateHandler(type, time)}>
                  {day}
                </Day>
              ))}
            </DaysWrapper>
          </CSSTransition>
        </SwitchTransition>
      </DaysWrapperOverflow>

      {isTimeSelector && (
        <TimeSelector
          value={stateDate}
          onChange={(d) => onChangeDateHandler('current', d, true)}
        />
      )}
    </Container>
  )
}

type TimeSelectorProps = {
  value: Date
  onChange: (time: Date) => void
}

const makeTime = (count: number) =>
  new Array(count)
    .fill('')
    .map((_, i) => ({ label: `${i}`.padStart(2, '0'), value: i }))

const timeSelectorTime = {
  hoursData: makeTime(24),
  minutesData: makeTime(60),
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ value, onChange }) => {
  const { t } = useTranslation()

  const onChangeHandler = (type: 'hour' | 'minute', val: number) => {
    const dateVal = new Date(value)

    const newDate = set(dateVal, {
      hours: type === 'hour' ? val : dateVal.getHours(),
      minutes: type === 'minute' ? val : dateVal.getMinutes(),
    })

    onChange(newDate)
  }

  const val = new Date(value)
  return (
    <FieldContainer row sxStyle={{ padding: '0 10px' }}>
      <ComboBox
        value={val.getHours()}
        placeholder='ЧЧ'
        data={timeSelectorTime.hoursData}
        emptyText=''
        onChange={({ target }) => onChangeHandler('hour', target.value)}
        name='calendarHours'
      />
      <Text>{t('common.calendar.hour')}</Text>
      <ComboBox
        value={val.getMinutes()}
        placeholder='MM'
        data={timeSelectorTime.minutesData}
        emptyText=''
        onChange={({ target }) => onChangeHandler('minute', target.value)}
        name='calendarMinutes'
      />
      <Text>{t('common.calendar.minute')}</Text>
    </FieldContainer>
  )
}

export default Calendar
