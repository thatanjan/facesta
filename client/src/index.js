import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'

import CssBaseline from '@material-ui/core/CssBaseline'
import App from 'App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
// import reportWebVitals from './reportWebVitals'

import store from 'redux/store/store'

import setAuthToken from 'redux/utils/setAuthToken'
import { setCurrentUser } from 'redux/actions/authActions'

const token = localStorage.jwtToken

// check for token
if (token) {
	// set auth token header auth
	setAuthToken(token)

	// decode token and get user info
	const decodedToken = jwt_decode(token)
	store.dispatch(setCurrentUser(decodedToken))
}

ReactDOM.render(
	<CssBaseline>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</CssBaseline>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
