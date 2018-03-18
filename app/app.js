import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './appcontainer'
require('font-awesome/css/font-awesome.min.css')
import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Montserrat:100,200,400,700', 'Open+Sans:300,400,700']
  }
})

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
