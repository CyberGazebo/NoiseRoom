import styled from 'styled-components'
import { PageContainer, PageContent } from '../../components/Base'
import Button from '../../components/Button'
import IconLink from '../../components/IconLink'
import Input from '../../components/Input'
import RoutesPaths from '../../enums/routesPaths'
import customHistory from '../../utils/history'

const UnAuthProfile: React.FC = () => {
  const onRegisterClick = () => {
    customHistory.push(RoutesPaths.REGISTRATION)
  }

  return (
    <PageContainer>
      <Content>
        <h1>Для просмотра профиля необходимо авторизироваться</h1>

        <InnerContainer>
          <Input placeholder='Почта' />
          <Input placeholder='Пароль' />

          <Button>Войти</Button>
          <Button onClick={onRegisterClick}>Зарегистрироваться</Button>

          <AdditionalButtons>
            <IconLink src='./images/auth_vk.svg' link='#' />
            <IconLink src='./images/auth_y.svg' link='#' />
          </AdditionalButtons>
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
    margin-bottom: 100px;
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

const AdditionalButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export default UnAuthProfile
