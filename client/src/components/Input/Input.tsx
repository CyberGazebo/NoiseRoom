import React from 'react'
import styled from 'styled-components'

type IProps = Omit<JSX.IntrinsicElements['input'], 'ref'>

const Input: React.FC<IProps> = ({ ...restProps }) => {
  return <StyledInput {...restProps} />
}

const StyledInput = styled.input`
  outline: none;
  background-color: #d9d9d9;
  color: #040404;
  padding: 11px 19px;
  border-radius: 30px;
`

export default Input
