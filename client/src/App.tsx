import { Route, Routes } from 'react-router-dom'

import styled from 'styled-components'
import { Footer, Header, Main } from './layouts'
import RoutesArray from './routes'

const App = () => {
  return (
    <Container>
      <Header />

      <Main>
        <Routes>
          {RoutesArray.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={typeof element === 'function' ? element() : element}
            />
          ))}
        </Routes>
      </Main>

      <Footer />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  color: #fff;
  flex-direction: column;
`

export default App
