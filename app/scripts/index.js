import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'

// import stores from './stores'
const appPath = './components/App/App'
const App = require('./components/App/App')

const render = Component => {
  ReactDOM.render(
    <AppContainer>

      <Component />

    </AppContainer>,
    document.getElementById('main')
  )
}

render(App)

if (module.hot) {
  module.hot.accept(appPath, () => render(App))
}
