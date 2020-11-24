import React from 'react'
import PropTypes from 'prop-types'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

import BackgroundPaper from 'HOC/BackgroundPaper'

const PageLayoutComponent = ({
	Drawer = false,
	Content = false,
	RightSection,
}) => {
	const matches = useMediaQuery('(min-width:960px)')

	const contentWidth = () => {
		if (Drawer && !RightSection) {
			return 8
		}
		if (!Drawer && RightSection) {
			return 8
		}
		return 6
	}

	contentWidth()

	return (
		<BackgroundPaper>
			<Grid
				container
				spacing={Drawer && RightSection ? 2 : 0}
				justify='space-evenly'
			>
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

PageLayoutComponent.defaultProps = {
	Drawer: undefined,
	RightSection: undefined,
}

PageLayoutComponent.propTypes = {
	Drawer: PropTypes.elementType,
	Content: PropTypes.elementType.isRequired,
	RightSection: PropTypes.elementType,
}

export default PageLayoutComponent
