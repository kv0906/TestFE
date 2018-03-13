import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './appcontainer'
require('font-awesome/css/font-awesome.min.css')
require('./stylesheets/style.scss')
require('./stylesheets/pages.scss')

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}
render(App)

if (module.hot) {
  module.hot.accept('./appcontainer', () => { render(App) })
}
