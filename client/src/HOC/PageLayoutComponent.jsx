import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import BackgroundPaper from 'HOC/BackgroundPaper'

const PageLayoutComponent = ({ Drawer, Content, RightSection }) => {
	const matches = useMediaQuery('(min-width:960px)')

	return (
		<BackgroundPaper>
			<Grid container spacing={2} justify='space-evenly'>
				{matches && Drawer && (
					<Grid item sm={3}>
						<Drawer />
					</Grid>
				)}
				{Content && (
					<Grid item sm={6}>
						<Content />
					</Grid>
				)}
				{matches && RightSection && (
					<Grid item sm={3}>
						<RightSection />
					</Grid>
				)}
			</Grid>
		</BackgroundPaper>
	)
}

export default PageLayoutComponent
