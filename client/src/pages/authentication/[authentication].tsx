import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import {
	makeStyles,
	createStyles,
	ThemeProvider,
} from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

import { lightTheme } from 'themes/theme'
import capitalize from 'utils/capitalize'
import { LOGIN, SIGN_UP, TOKEN_NAME } from 'variables/global'
import { redirectToHome } from 'utils/authRedirect'
import checkValidJwt from 'utils/checkValidJwt'

const useStyles = makeStyles(() =>
	createStyles({
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
			display: 'grid',
			width: '80vw',
			maxWidth: '30rem',
			justifyContent: 'center',
			alignContent: 'center',

			margin: '0 auto',

			top: '50%',
			position: 'relative',
			transform: 'translateY(-50%)',

			'& >  form': {
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

const LogInForm = dynamic(
	() => import('components/UserAuthenticationForms/LogInForm'),
	{
		loading: () => <CircularProgress />,
	}
)

const SignUpForm = dynamic(
	() => import('components/UserAuthenticationForms/SignUpForm'),
	{
		loading: () => <CircularProgress />,
	}
)

const UserAuthenticationPage = () => {
	const {
		query: { authentication: auth },
	}: any = useRouter()

	const [pageTitle, setPageTitle] = useState('Loading')

	const {
		logInBackground,
		boxContainerStyle,
		backgroundImageOverlay,
		formContainer,
	} = useStyles()

	useEffect(() => {
		if (auth) {
			const capitalizeTitle = capitalize(auth)
			setPageTitle(capitalizeTitle)
		}
	}, [auth])

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				<meta name={pageTitle} content={`users can ${pageTitle} here`} />
			</Head>

			<ThemeProvider theme={lightTheme}>
				<Box className={boxContainerStyle}>
					<Image
						className={logInBackground}
						src='/images/log_in_background_image.jpg'
						alt='hello world'
						layout='fill'
					/>
					<Paper className={formContainer}>
						{auth === LOGIN && <LogInForm />}
						{auth === SIGN_UP && <SignUpForm />}
					</Paper>
				</Box>
				<Paper className={backgroundImageOverlay} />
			</ThemeProvider>
		</>
	)
}

export default UserAuthenticationPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const { cookies } = req

	const token = cookies?.[TOKEN_NAME]

	try {
		const result = await checkValidJwt(token)
		if (result) {
			redirectToHome(res)
		}
	} catch (error) {}

	return { props: {} }
}
