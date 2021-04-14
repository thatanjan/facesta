import { NextSeo } from 'next-seo'
import React from 'react'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'

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
}))

const Logout = () => {
	const { container, title } = useStyles()

	const { back } = useRouter()

	return (
		<>
			<NextSeo title='404 | page not found' />
			<Grid container className={container} alignContent='center'>
				<Grid item xs={12}>
					<Typography className={title} align='center' variant='h1'>
						This Page does not exist
					</Typography>
				</Grid>

				<Grid container item justify='center' xs={12}>
					<Button onClick={() => back()}>Take me back</Button>
				</Grid>
			</Grid>
		</>
	)
}

export default Logout
