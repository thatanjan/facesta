import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'

import BackgroundPaper from 'HOC/BackgroundPaper'

const useStyles = makeStyles({
	containerStyle: {
		margin: 0,
	},
})

const PageLayoutComponent = ({ Drawer, Content, RightSection }) => {
	const matches = useMediaQuery('(min-width:960px)')

	const contentWidth = () => {
		if (Drawer && !RightSection) {
			return 8
		} else if (!Drawer && RightSection) {
			return 8
		} else {
			return 6
		}
	}

	contentWidth()

	return (
		<BackgroundPaper>
			<Grid container spacing={Drawer && RightSection && 2} justify='space-evenly'>
				{matches && Drawer && (
					<Grid item md={3}>
						<Drawer />
					</Grid>
				)}
				{Content && (
					<Grid item xs={10} md={contentWidth()}>
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
