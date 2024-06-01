import { createRoot } from 'react-dom/client'

import customHistory from './utils/history'
import HistoryRouter from './utils/historyRouter'

import App from './App'
import { GlobalStyle } from './theme'

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
  <HistoryRouter history={customHistory}>
    <GlobalStyle />
    <App />
  </HistoryRouter>
)

const devMode = process.env.NODE_ENV === 'development'

if (devMode && module && module.hot) {
  module.hot.accept()
}
