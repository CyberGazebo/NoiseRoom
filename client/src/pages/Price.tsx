import styled from 'styled-components'
import { PageContainer, PageContent } from '../components/Base'

const Price: React.FC = () => {
  return (
    <PageContainer>
      <Content>
        <SmallLogo src='./images/small_logo.svg' />
        <h1>Стоимость услуг репетиционной базы</h1>
        <br />

        <p>
          Будние/выходные дни — <b>350р. час</b>
        </p>
        <p>
          Тарелки для барабанной установки — <b>75р. час</b>
        </p>
        <p>
          Кардан Yamaha DFP-9415 — <b>100р. репетиция</b>
        </p>
        <p>
          Аренда инструмента (электро/бас гитара) — <b>100р. репетиция</b>
        </p>
        <p>
          Live запись — <b>100р. репетиция</b>{' '}
        </p>
        <br />

        <h1>БЕСПЛАТНО:</h1>
        <p>Педали эффектов</p>
        <p>Одиночная педаль — Tama iron cobra flexi glide</p>
        <p>Синтезатор — Yamaha PSR 520</p>
        <p>Чай/Кофе</p>
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

export default Price
