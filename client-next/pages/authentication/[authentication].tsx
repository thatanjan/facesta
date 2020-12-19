import { useRouter } from 'next/router'
import Image from 'next/image'

import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		special: {
			opacity: 0.3,
			height: '100vh',
		},
		boxContainerStyle: {
			maxWidth: '100vw',
			height: '100vh',
		},
		logInBackground: {
			objectFit: 'cover',
			zIndex: -2,
		},
		backgroundImageOverlay: {
			height: '100vh',
			width: '100vw',
			position: 'absolute',
			top: '0',
			left: '0',
			background: 'black',
			opacity: '0.7',
			zIndex: -1,
		},
		formContainer: {
			width: '80vw',
			maxWidth: '30rem',
			background: `${theme.palette.primary.contrastText}`,
			justifyContent: 'center',
			alignContent: 'center',

			margin: '0 auto',

			top: '50%',
			position: 'relative',
			transform: 'translateY(-50%)',

			'& >  form': {
				width: '80%',
				padding: '2rem 0 ',

				'& > a ': {
					paddingBottom: '1rem',
				},
				'& > div': {
					width: '100%',
					paddingBottom: '1rem',
				},
			},
		},
	})
)

// const LogInForm = lazy(
// 	() => import('components/UserAuthenticationForms/LogInForm')
// )

// const SignUpForm = lazy(
// 	() => import('components/UserAuthenticationForms/SignUpForm')
// )

const UserAuthenticationPage = () => {
	const { auth }: any = useRouter()

	const {
		logInBackground,
		boxContainerStyle,
		backgroundImageOverlay,
		special,
		formContainer,
	} = useStyles()

	return (
		<>
			<Box className={boxContainerStyle}>
				<Image
					className={logInBackground}
					src='/images/log_in_background_image.jpg'
					alt='hello world'
					layout='fill'
				/>
				{/* <Suspense fallback={<div> hello world </div>}>
					<Grid container className={formContainer}>
						{auth === 'login' && <LogInForm />}
						{auth === 'sign_up' && <SignUpForm />}
					</Grid>
				</Suspense> */}
			</Box>
			<Paper className={backgroundImageOverlay} />
		</>
	)
}

export default UserAuthenticationPage
