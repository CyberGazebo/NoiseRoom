import { useEffect, RefObject } from 'react'

type Event = MouseEvent | TouchEvent

/**
 * Хук для проверки нажатия вне ref'a.
 *
 * @param ref Реф на элемент/комопент.
 * @param callback Функция, срабатывающая после клика.
 */
const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: (event: Event) => void
) => {
  useEffect(() => {
    //Функция слушателя.
    const listener = (event: Event) => {
      const el = ref?.current
      //Проверка, на клик в пределах элемента/компонента.
      if (!el || el.contains((event?.target as Node) || null)) {
        return
      }

      // Если за пределами. Тогда запускаем callback.
      callback(event)
    }

    // Вешаем события.
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      //А после работы, убираем за собой.
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, callback])
}

export default useOnClickOutside
