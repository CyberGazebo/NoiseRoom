import styled from 'styled-components'
import { PageContainer, PageContent } from '../components/Base'

const Contacts: React.FC = () => {
  return (
    <PageContainer>
      <Content>
        <SmallLogo src='./images/small_logo.svg' />
        <p>г. Краснодар, Черёмушки </p>
        <p>ул. 2-я Пятилетка 13/1</p>
        <br />

        <p>
          <b>+7 952 856 10 27</b>
        </p>
        <p>Работает круглосуточно,</p>
        <p>звонить с 10:00 до 23:00</p>

        <Map>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2820.0901204850056!2d39.0240875!3d45.023095999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f0501d42270e5b%3A0x60329f287cfbf63a!2z0YPQuy4gMi3RjyDQn9GP0YLQuNC70LXRgtC60LAsIDEzLCDQmtGA0LDRgdC90L7QtNCw0YAsINCa0YDQsNGB0L3QvtC00LDRgNGB0LrQuNC5INC60YDQsNC5LCAzNTAwNDA!5e0!3m2!1sru!2sru!4v1716327260223!5m2!1sru!2sru'
            width='600'
            height='450'
            allowFullScreen={false}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'></iframe>
        </Map>
      </Content>
    </PageContainer>
  )
}

const Content = styled(PageContent)`
  width: 850px;
`

const SmallLogo = styled.img`
  margin-bottom: 40px;
`

const Map = styled.div`
  margin-top: 40px;

  & iframe {
    width: 100%;
  }
`

export default Contacts
