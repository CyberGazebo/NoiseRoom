import styled from 'styled-components'
import Button from '../components/Button'
import { RoutesButtons } from '../constants'
import customHistory from '../utils/history'

const Header: React.FC = () => {
  const pathname = window.location.pathname.slice(1)

  return (
    <Container>
      <Logo />

      <ButtonsWrapper>
        {RoutesButtons.map(({ text, link }) => (
          <Button
            key={link}
            active={link === pathname}
            onClick={() => customHistory.push(link)}>
            {text}
          </Button>
        ))}
      </ButtonsWrapper>
    </Container>
  )
}

const Container = styled.div`
  max-width: 1600px;
  width: 100%;
  height: 155px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 90px;
`

const Logo = styled.div`
  background-image: url('./images/logo.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 155px;
  height: 155px;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 25px;

  & button {
    min-width: 250px;
  }
`

export default Header
