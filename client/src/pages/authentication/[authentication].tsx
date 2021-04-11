import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {
	makeStyles,
	createStyles,
	Theme,
	useTheme,
} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import clsx from 'clsx'

import CircularLoader from 'components/Loaders/CircularLoader'

import { LOGIN, SIGN_UP, APP_NAME } from 'variables/global'
import getToken from 'utils/getToken'
import createRedirectObject from 'utils/createRedirectObject'
import checkValidJwt from 'utils/checkValidJwt'
import Requset from 'interfaces/requsetResponse'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		containerStyle: {
			maxWidth: '100vw',
			height: '100vh',
		},

		formContainer: {
			background: theme.palette.background.paper,
			padding: '2rem ',

			'@media (max-width:400px)': {
				maxWidth: 'none',
				flexBasis: '90%',
			},

			'& > a': {
				margin: '10px 0',
				padding: '10px',
				flexBasis: '100%',
			},
			'& >  form': {
				flexBasis: '100%',
				'& > a ': {
					paddingBottom: '1rem',
				},
				'& > div': {
					width: '100%',
					paddingBottom: '1rem',
				},
				'& > button': {
					width: '100%',
				},
			},
		},
		headerStyle: {
			textAlign: 'center',
			alignSelf: 'center',

			[theme.breakpoints.up('md')]: {
				paddingLeft: theme.spacing(6),
				textAlign: 'start',
			},
		},
	})
)

const LogInForm = dynamic(
	() => import('components/Forms/UserAuthenticationForms/LogInForm'),
	{ loading: () => <CircularLoader /> }
)

const SignUpForm = dynamic(
	() => import('components/Forms/UserAuthenticationForms/SignUpForm'),
	{ loading: () => <CircularLoader /> }
)

interface Props {
	authentication: string
}

const UserAuthenticationPage = ({ authentication }: Props) => {
	const theme = useTheme()
	const largerThanMD = useMediaQuery(theme.breakpoints.up('md'))

	const { containerStyle, formContainer, headerStyle } = useStyles()

	let title: string =
		authentication.charAt(0).toUpperCase() + authentication.slice(1)

	title = title.replace('-', ' ')

	return (
		<>
			<NextSeo title={title} />

			<Grid container className={containerStyle}>
				<Grid item xs={12} md={6} className={headerStyle}>
					<Typography variant='h1'> {APP_NAME}</Typography>
					<Typography variant='h4'>
						Let your Imposter Syndrome come from your brain
					</Typography>
				</Grid>

				<Grid
					md={6}
					xs={12}
					container
					justify='center'
					alignItems={largerThanMD ? 'center' : 'baseline'}
					item
				>
					<Grid
						container
						justify='center'
						item
						xs={8}
						sm={6}
						md={8}
						lg={6}
						xl={5}
						className={clsx(formContainer, 'MuiPaper-rounded')}
						component={Paper}
						square
					>
						{authentication === LOGIN && <LogInForm />}
						{authentication === SIGN_UP && <SignUpForm />}
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default UserAuthenticationPage

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query: { authentication },
}) => {
	const token = getToken(req as Requset)

	if (token && (await checkValidJwt(token))) {
		return createRedirectObject('/')
	}

	return { props: { authentication } }
}
