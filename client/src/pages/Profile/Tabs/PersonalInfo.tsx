import styled from 'styled-components'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

type IProps = {}

const PersonalInfo: React.FC<IProps> = ({}) => {
  return (
    <Container>
      <InputContainer>
        <label>Электронная почта</label>
        <Input placeholder='mail@mail.ru' />
      </InputContainer>

      <InputContainer>
        <label>Имя пользователя</label>
        <Input placeholder='username' />
      </InputContainer>

      <InputContainer>
        <label>Номер телефона</label>
        <Input placeholder='8 (000) 000-00-00' />
      </InputContainer>

      <InputContainer>
        <label>Пароль</label>
        <Input type='password' placeholder='**********' />
      </InputContainer>

      <InputContainer>
        <div style={{ flex: 1 }}></div>
        <Button sx={{ flex: 2 }}>Изменить пароль</Button>
      </InputContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 30px;
  width: 550px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  & input {
    flex: 2;
  }

  & label {
    flex: 1;
    overflow: hidden;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`

export default PersonalInfo
