import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const Page = () => {
	return (
		<Grid container alignItems='center' style={{ height: '100vh' }}>
			<Grid item xs={12}>
				<Typography variant='h1' align='center'>
					This website is under Development
				</Typography>
			</Grid>
		</Grid>
	)
}

export default Page
