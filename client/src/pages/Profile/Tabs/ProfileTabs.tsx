import { ITab } from '../../../components/TabPanel'
import Equipment from './Equipment'
import PersonalInfo from './PersonalInfo'

type ExtendsITab = ITab & {
  element: React.ReactNode
}

export const profileTabs: ExtendsITab[] = [
  {
    tabId: 'personalInfo',
    title: 'персональные данные',
    element: <PersonalInfo />,
  },
  {
    tabId: 'equipment',
    title: 'брони',
    element: <Equipment />,
  },
]
