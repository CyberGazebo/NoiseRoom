import { Router } from 'react-router-dom'
import { BrowserHistory } from 'history'
import { ReactNode, useLayoutEffect, useState } from 'react'

type CustomBrowserRouterType = {
  children?: ReactNode
  basename?: string
  history: BrowserHistory
}

const HistoryRouter = ({
  basename,
  children,
  history,
}: CustomBrowserRouterType) => {
  const [stateHistory, setStateHistory] = useState({
    action: history.action,
    location: history.location,
  })

  useLayoutEffect(() => {
    history.listen(setStateHistory)
  }, [history])

  return (
    <Router
      basename={basename}
      children={children}
      navigator={history}
      location={stateHistory.location}
      navigationType={stateHistory.action}
    />
  )
}

export default HistoryRouter
