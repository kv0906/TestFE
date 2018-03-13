import React from 'react'
import { Router, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import config from './components/Config/config'

import HomePage from 'HomePage'
import Main from 'Main'
// reducer state store action
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import addressesReducer from './redux/reducer/addresses'

// Apply the middleware to the store
const middleware = routerMiddleware(browserHistory)

const reducers = combineReducers({
  addresses: addressesReducer
})

const store = createStore(
  reducers,
  applyMiddleware(middleware)
)

export default class App extends React.Component {
  componentWillMount () {
    // get addresses data from firebase
    // fetch(`${config.api_root}production/?format=json&page_size=1000&fields=id,title,slug,thumbnail,meta_description,categories`)
    //   .then(response => response.json())
    //   .then((json) => {
    //     store.dispatch({
    //       type: 'SET_ARRAY_PRODUCTION',
    //       arrProduction: json
    //     })
    //   })
  }

  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Router path="/" component={Main}>
            <IndexRoute component={HomePage} />
          </Router>
        </Router>
      </Provider>
    )
  }
}
