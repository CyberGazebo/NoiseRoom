import styled, { css } from 'styled-components'

export type ITab = {
  tabId: string
  title: string
}

type IProps = {
  tabs: ITab[]
  tabId: string
  onChange: (tabId: string) => void
}

const TabPanel: React.FC<IProps> = ({ tabId, tabs, onChange }) => {
  return (
    <TabWrapper>
      {tabs.map((tab) => (
        <TabButton
          active={tab.tabId === tabId}
          onClick={() => onChange(tab.tabId)}>
          {tab.title}
        </TabButton>
      ))}
    </TabWrapper>
  )
}

const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const TabButton = styled.div<{ active?: boolean }>`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: 0.1s linear all;
  backdrop-filter: blur(10px);

  ${({ active }) => {
    if (active) {
      return css`
        background-color: #d9d9d93e;
      `
    }
  }}

  &:hover {
    background-color: #d9d9d93e;
  }
`

export default TabPanel
