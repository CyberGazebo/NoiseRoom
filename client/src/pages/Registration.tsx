import styled from 'styled-components'
import { PageContainer, PageContent } from '../components/Base'
import Input from '../components/Input'
import Button from '../components/Button'
import customHistory from '../utils/history'
import RoutesPaths from '../enums/routesPaths'

const Registration: React.FC = () => {
  const onBackClick = () => {
    customHistory.push(RoutesPaths.PROFILE)
  }

  return (
    <PageContainer>
      <Content>
        <h1>Регистрация</h1>

        <InnerContainer>
          <Input placeholder='Почта' />
          <Input placeholder='Имя пользователя' />
          <Input placeholder='Номер телефона' />
          <Input placeholder='Пароль' />
          <Input placeholder='Повторите пароль' />

          <Button>Зарегистрироваться</Button>
          <Button onClick={onBackClick}>Авторизоваться</Button>
        </InnerContainer>
      </Content>
    </PageContainer>
  )
}

const Content = styled(PageContent)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & h1 {
    text-align: center;
    margin-bottom: 50px;
  }
`

const InnerContainer = styled.div`
  margin: 0 auto;
  gap: 30px;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default Registration
