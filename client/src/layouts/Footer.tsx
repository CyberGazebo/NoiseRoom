import styled from 'styled-components'
import IconLink from '../components/IconLink'
import { IconLinks } from '../constants'

const Footer: React.FC = () => {
  return (
    <Container>
      <Info>
        <div>улица 2-я Пятилетка, 13/1, Краснодар</div>
        <div>+7 (952) 856 10 27</div>
      </Info>

      <Links>
        {IconLinks.map(({ icon, link }) => (
          <IconLink key={icon} src={icon} link={link} />
        ))}
      </Links>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 230px;
  min-height: 230px;
  margin-top: 30px;
  padding: 0 90px;
  background-color: #00000080;
  backdrop-filter: blur(4px);
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #fff;

  & div {
    font-size: 16px;
  }
`

const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export default Footer
