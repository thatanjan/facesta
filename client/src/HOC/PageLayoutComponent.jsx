import React from 'react'
import { makeStyles } from '@material-ui/core/'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import BackgroundPaper from 'HOC/BackgroundPaper'

const useStyles = makeStyles(theme => ({}))

const PageLayoutComponent = ({ Drawer, Content, RightSection }) => {
	const matches = useMediaQuery('(min-width:600px)')

	console.log(matches)

	return (
		<BackgroundPaper>
			<Grid container spacing={2}>
				{matches && Drawer && (
					<Grid item>
						<Drawer />
					</Grid>
				)}
				{Content && (
					<Grid item>
						<Content />
					</Grid>
				)}
				{matches && RightSection && (
					<Grid item>
						<RightSection />
					</Grid>
				)}
			</Grid>
		</BackgroundPaper>
	)
}

export default PageLayoutComponent
