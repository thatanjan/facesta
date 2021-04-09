import React from 'react'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
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
	subTitle: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '1.5rem',
		},
	},
}))

const Logout = () => {
	const { container, title, subTitle } = useStyles()

	return (
		<>
			<Grid container className={container} alignContent='center'>
				<Grid item xs={12}>
					<Typography className={title} align='center' variant='h1'>
						404
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<Typography className={subTitle} variant='h3' align='center'>
						Sorry No Page Found
					</Typography>
				</Grid>
			</Grid>
		</>
	)
}

export default Logout
