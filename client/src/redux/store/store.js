import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from 'redux/reducers/rootReducer'

const middlewares = [logger, thunk]

// const store = createStore(rootReducer, applyMiddleware(...middlewares))

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(...middlewares),

		/* eslint no-underscore-dangle: 0 */
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

export default store
