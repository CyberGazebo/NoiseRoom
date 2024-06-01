import React from 'react'
import styled from 'styled-components'

type IProps = {
  children: React.ReactNode
}

const Main: React.FC<IProps> = ({ children }) => {
  return <Container>{children}</Container>
}

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0 10px;
`

export default Main
