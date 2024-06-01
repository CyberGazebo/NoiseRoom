import { CSSObject } from 'styled-components'

const getSize = (value: string | number) => {
  const val = parseInt(value as string)
  return !isNaN(val) ? val + 'px' : value
}

/**
 * Во время использования флекса и при дальнейшем изменении размеров элемента,
 * те элементы, что внутри немного "едут". Для предотвращения сего действия,
 * необходимо указать им ширину, минимальную ширину и максимальную ширину.
 * Чтобы не запариваться, есть такая функции.
 * @param value
 * @returns
 */
const flWidth = (value: number | string): CSSObject => {
  const width = getSize(value)

  return {
    width,
    minWidth: width,
    maxWidth: width,
  }
}

/**
 * Также как и flWidth, только это высота.
 * @param value
 * @returns
 */
const flHeight = (value: number | string): CSSObject => {
  const height = getSize(value)

  return {
    height,
    minHeight: height,
    maxHeight: height,
  }
}

export { flHeight, flWidth }
