import React from 'react'
import { Router, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import config from './config'

import HomePage from 'HomePage'
import Main from 'Main'
// reducer state store action
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import productReducer from './redux/reducer/product'
import filterReducer from './redux/reducer/filter'
import tweetReducer from './redux/reducer/tweet'

// const history = createHistory()
// Apply the middleware to the store
const middleware = routerMiddleware(browserHistory)

const reducers = combineReducers({
  production: productReducer,
  filter: filterReducer,
  tweets: tweetReducer
})

const store = createStore(
  reducers,
  applyMiddleware(middleware)
)

export default class App extends React.Component {
  componentWillMount () {
    // get products array
    // fetch(`${config.api_root}production/?format=json&page_size=1000&fields=id,title,slug,thumbnail,meta_description,categories`)
    //   .then(response => response.json())
    //   .then((json) => {
    //     store.dispatch({
    //       type: 'SET_ARRAY_PRODUCTION',
    //       arrProduction: json
    //     })
    //   })

    // get product category array
    // fetch(`${config.api_root}production-category/?format=json`)
    //   .then(response => response.json())
    //   .then((json) => {
    //     store.dispatch({
    //       type: 'SET_ARRAY_CATEGORY',
    //       arrCategory: json
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
