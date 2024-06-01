import { useEffect, useRef } from 'react';

/**
 * Устанавливает timeout.
 *
 * @param callback выполняемая функция.
 * @param delay задержка в мс.
 */
function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Запоминаем последнее изменение callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    //Проверяем, если задержка 0, либо ее нет, то ничего не делаем.
    if (!delay && delay !== 0) return;

    // Если все нормально, то ставим timeout.
    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
}

export default useTimeout;
