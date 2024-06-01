import React from 'react'
import styled, { CSSObject, css } from 'styled-components'

type IProps = {
  children: React.ReactNode
  isDisabled?: boolean
  active?: boolean
  sx?: CSSObject
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<IProps> = ({
  sx,
  active,
  children,
  isDisabled,
  onClick,
}) => {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return
    onClick?.(e)
  }

  return (
    <StyledButton sx={sx} active={active} onClick={onClickHandler}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button<{ active?: boolean; sx?: CSSObject }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffffff;
  background-color: #00000080;
  color: #ffffff;
  padding: 11px 20px;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.1s linear all;
  backdrop-filter: blur(10px);

  ${({ active }) => {
    if (active) {
      return css`
        background-color: #3f279e3e;
      `
    }
  }}

  &:hover {
    background-color: #3f279e3e;
  }

  ${({ sx }) => sx};
`

export default Button
