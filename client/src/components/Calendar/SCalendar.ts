import styled, { css, CSSObject } from 'styled-components'
import { ICalendarAnimDirection } from './ICalendar'

const getAnimationProps = (direction: ICalendarAnimDirection) =>
  ({
    left: {
      enter: 'translateX(-100%)',
      active: 'translateX(0%)',
      exit: 'translateX(100%)',
    },
    right: {
      enter: 'translateX(100%)',
      active: 'translateX(0%)',
      exit: 'translateX(-100%)',
    },
    top: {
      enter: 'translateY(-100%)',
      active: 'translateY(0%)',
      exit: 'translateY(100%)',
    },
    bottom: {
      enter: 'translateY(100%)',
      active: 'translateY(0%)',
      exit: 'translateY(-100%)',
    },
    '': { enter: '', active: '', exit: '' },
  }[direction])

export const Container = styled.div<{ expanded: boolean; sxStyle?: CSSObject }>`
  width: 155px;
  height: ${({ expanded }) => (expanded ? '200' : '175')}px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.focus};

  ${({ sxStyle }) => sxStyle}
`

export const Header = styled.div`
  height: 24px;
  display: flex;
  color: #fff;
  justify-content: space-around;
  align-items: center;
  user-select: none;

  border-bottom: 1px solid ${({ theme }) => theme.colors.focus};
  background-color: ${({ theme }) => theme.colors.default};
`

export const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 4px;
    height: 100%;
  }
`
export const Month = styled.span`
  width: 52px;
`
export const Year = styled.span`
  width: 30px;
`

export const Controller = styled.div<{ isPrev?: boolean }>`
  width: 15px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    & > svg {
      fill: #fff;
    }
  }

  & > svg {
    fill: #d3d3d3;
    transition: fill 0.2s ease;
    transform: ${({ isPrev }) => (isPrev ? 'rotate(90deg)' : 'rotate(-90deg)')};
  }
`

export const DaysWeek = styled.div`
  user-select: none;
  height: 19px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 6px;
  background-color: ${({ theme }) => theme.colors.footerBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gridBoder};

  & span {
    width: 14px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    user-select: none;
  }
`

export const DaysWrapperOverflow = styled.div`
  overflow: hidden;
`

export const DaysWrapper = styled.div<{
  animationDirection: ICalendarAnimDirection
}>`
  padding: 5px 0 5px 6px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 20px);

  ${({ animationDirection }) => {
    if (animationDirection !== '') {
      const { enter, active, exit } = getAnimationProps(animationDirection)
      return css`
        &.fade {
          &-enter {
            opacity: 0;
            transform: ${enter};
          }
          &-enter-active {
            opacity: 1;
            transform: ${active};
          }
          &-exit {
            opacity: 1;
            transform: ${active};
          }
          &-exit-active {
            opacity: 0;
            transform: ${exit};
          }
          &-enter-active,
          &-exit-active {
            transition: opacity 200ms, transform 200ms;
          }
        }
      `
    }
  }}
`

export const Day = styled.div<{
  selected?: boolean
  isDisabled?: boolean
  notCurrent?: boolean
}>`
  width: 20px;
  height: 20px;
  display: block;
  text-align: center;
  cursor: pointer;
  user-select: none;
  line-height: 20px;
  padding-left: 1px;
  transition: all 0.1s ease-out;

  ${({ isDisabled, selected }) => {
    if (isDisabled) {
      return css`
        cursor: default;
        background-color: ${({ theme }) => theme.colors.disabledDay};
        color: ${({ theme }) => theme.colors.disabledDayText};
      `
    } else {
      if (selected) {
        return css`
          background-color: ${({ theme }) => theme.colors.default};
          color: #fff;
        `
      } else {
        return css`
          &:hover {
            background-color: ${({ theme }) => theme.colors.default};
            color: #fff;
          }
        `
      }
    }
  }}

  ${({ notCurrent }) => {
    if (notCurrent) {
      return css`
        color: ${({ theme }) => theme.colors.labelColor};
      `
    }
  }}
`
