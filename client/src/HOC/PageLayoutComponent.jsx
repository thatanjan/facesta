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
					<Grid item md={3}>
						<Drawer />
					</Grid>
				)}
				{Content && (
					<Grid item xs={10} md={6}>
						<Content />
					</Grid>
				)}
				{matches && RightSection && (
					<Grid item md={3}>
						<RightSection />
					</Grid>
				)}
			</Grid>
		</BackgroundPaper>
	)
}

export default PageLayoutComponent
