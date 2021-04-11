import { NextSeo } from 'next-seo'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { cache } from 'swr'

import { LOGIN_URL, APP_NAME } from 'variables/global'

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		minWidth: '100vw',
		minHeight: '100vh',
	},
	title: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '3rem',
		},
	},
	subTitle: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.5rem',
		},
	},
}))

const Logout = () => {
	const { container, title, subTitle } = useStyles()

	const { push } = useRouter()

	cache.clear()
	Cookies.remove('jwt')

	useEffect(() => {
		setTimeout(() => {
			push(LOGIN_URL)
		}, 3000)
	})

	return (
		<>
			<NextSeo title='Logout' />

			<Grid container className={container} alignContent='center'>
				<Grid item xs={12}>
					<Typography className={title} align='center' variant='h1'>
						{APP_NAME}
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<Typography className={subTitle} variant='h3' align='center'>
						We are logging you out
					</Typography>
				</Grid>
			</Grid>
		</>
	)
}

export default Logout
