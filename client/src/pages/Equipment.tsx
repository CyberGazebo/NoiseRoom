import styled from 'styled-components'
import { PageContent, PageContainer } from '../components/Base'

const Equipment: React.FC = () => {
  return (
    <PageContainer>
      <Content>
        <h1>Гитарные усилители:</h1>
        <p>Fender Hot Rod Deluxe + кабинет 2х12 Celescion Vintage</p>
        <p>Orange CR120H + кабинет 4x12 Celescion Vintage</p>
        <p>Усилители имеют 2 канала : Clean/Distortion</p>
        <br />

        <h1>Басовые усилители:</h1>
        <p>Fender Rumble 100</p>
        <br />

        <h1>Линия:</h1>
        <p>Цифровой микшерный пульт Behringer X18</p>
        <p>HK AUDIO L.U.C.A.S - два монитора + сабвуфер 15</p>
        <p>Yorkville Elite Micron - 2 портала 600 ват каждый</p>
        <p>Пассивные порталы 2х15 +усилитель</p>
        <br />

        <h1>Микрофоны:</h1>
        <p>Akg D7</p>
        <p>Akg D5</p>
        <p>Shure sm57</p>
        <br />

        <h1>Барабаны:</h1>
        <p>
          Tama Silvers star CustomТарелки на барабаны: PAISTE 5 , (Crash ,Ride,
          Hi Hat)
        </p>
        <p>3 стойки типа журавль + рука + стойка Hi-Hat</p>
        <p>Одиночная педаль - Iron cobra flexi glide</p>
        <p>Кардан - Yamaha DFP-9410</p>
        <br />

        <h1>Педали эффектов в ассортименте</h1>
      </Content>
    </PageContainer>
  )
}

const Content = styled(PageContent)`
  width: 800px;
`

export default Equipment
