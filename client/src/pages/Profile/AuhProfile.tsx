import { useState } from 'react'
import styled from 'styled-components'
import { PageContainer, PageContent } from '../../components/Base'
import TabPanel from '../../components/TabPanel'
import { profileTabs } from './Tabs/ProfileTabs'

const AuthProfile: React.FC = () => {
  const [tabId, setTabId] = useState(profileTabs[0].tabId)

  const currentTab = profileTabs.find((tab) => tab.tabId === tabId)

  return (
    <StyledPageContainer>
      <LeftContainer>
        <TabPanel
          tabId={tabId}
          tabs={profileTabs}
          onChange={(tabId) => setTabId(tabId)}
        />
      </LeftContainer>

      <RightContainer>{currentTab?.element}</RightContainer>
    </StyledPageContainer>
  )
}

const StyledPageContainer = styled(PageContainer)`
  flex-direction: row;
  gap: 22px;
  min-height: 500px;
`

const LeftContainer = styled(PageContent)`
  width: 100%;
  height: 100%;
  flex: 1;
  padding: 90px 0;
`

const RightContainer = styled(PageContent)`
  width: 100%;
  height: 100%;
  flex: 5;
`

export default AuthProfile
