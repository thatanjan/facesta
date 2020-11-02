import React, { Suspense, lazy } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
// import Paper from '@material-ui/core/Paper'
// import SwitchButton from '@material-ui/core/Switch'
// import Container from '@material-ui/core/Container'
// import Box from '@material-ui/core/Box'
// import { makeStyles } from '@material-ui/core/styles'
// import TypoGraphy from '@material-ui/core/Typography'
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'

// import { DarkLightModeThemeProvider, modeTheme } from 'themes/dark_light_mode'

// const useStyles = makeStyles({
// 	appBarStyle: {
// 		// background: 'teal',
// 	},
// 	paperStyle: {
// 		borderRadius: '0',
// 	},
// 	boxStyle: {
// 		minHeight: '100vh',
// 		maxHeight: '100vh',
// 	},
// 	toolbarStyle: {
// 		display: 'grid',
// 	},
// 	toggleButton: { justifySelf: 'end' },
// })

// const Loader = () => <div> loading</div>

// lazy loaded components
// const LogInPage = Loadable({
// 	loader: () => import('pages/logInPage/logInPage'),
// 	loading: loader,
// })
//

const Authentication = lazy(() =>
	import('pages/userAuthenticationPages/userAuthenticationPage')
)

const App = () => {
	// console.log(props)
	// const {
	// 	toggleButton,
	// 	toolbarStyle,
	// 	appBarStyle,
	// 	boxStyle,
	// 	paperStyle,
	// } = useStyles()

	// const [darkMode, toggleDarkMode] = useState(true)
	return (
		<>
			{/* <DarkLightModeThemeProvider theme={modeTheme(darkMode)}> */}
			{/* 	<Paper elevation={0} className={paperStyle}> */}
			{/* 		<Box className={boxStyle}> */}
			{/* <AppBar className={appBarStyle} color='primary'> */}
			{/* 	<Toolbar className={toolbarStyle}> */}
			{/* 		<Box className={toggleButton}> */}
			{/* 			<TypoGraphy component='span'>switch to dark mode</TypoGraphy> */}
			{/* 			<SwitchButton */}
			{/* 				checked={darkMode} */}
			{/* 				onChange={() => { */}
			{/* 					toggleDarkMode(!darkMode) */}
			{/* 				}} */}
			{/* 			/> */}
			{/* 		</Box> */}
			{/* 	</Toolbar> */}
			{/* </AppBar> */}
			{/* </Box> */}
			{/* </Paper> */}
			{/* </DarkLightModeThemeProvider> */}

			<Switch>
				<Route exact path='/authentication/:auth'>
					<Suspense fallback={<div>Loading...</div>}>
						<Authentication />
					</Suspense>
				</Route>
			</Switch>
		</>
	)
}

export default withRouter(App)
