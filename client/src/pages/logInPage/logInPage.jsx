import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import TypoGraphy from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import backgroundImageLogin from 'assets/images/log_in_background_image.jpg'

const useStyles = makeStyles({
	boxContainerStyle: {
		maxWidth: '100vw',
		height: '100vh',
	},
	logInBackground: {
		backgroundImage: `url(${backgroundImageLogin})`,
		position: 'fixed',
		height: '100vh',
		maxWidth: '100%',
		padding: '0',
		objectFit: 'cover',
		top: '0',
		left: '0',
	},
	backgroundImageOverlay: {
		height: '100vh',
		width: '100vw',
		position: 'absolute',
		top: '0',
		left: '0',
		background: 'black',
		opacity: '0.7',
	},
})

const LogInPage = () => {
	const {
		logInBackground,
		boxContainerStyle,
		backgroundImageOverlay,
	} = useStyles()
	return (
		<>
			<Box className={boxContainerStyle}>
				{/* for background Image */}
				<Container
					className={logInBackground}
					component='img'
					src={backgroundImageLogin}
				/>

				{/* for background Image overlay */}
				<Paper className={backgroundImageOverlay} />
			</Box>
		</>
	)
}

export default LogInPage
