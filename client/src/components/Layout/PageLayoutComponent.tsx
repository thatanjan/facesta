import React from 'react'
import dynamic from 'next/dynamic'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import CircularLoader from 'components/Loaders/CircularLoader'
import DrawerContextProvider from 'context/drawerContext'
import { screenSizeDrawer } from 'variables/global'
import BackgroundPaper from './BackgroundPaper'

const NavigationDrawerList = dynamic(
	() => import('components/Drawers/NavigationDrawerList'),
	{ loading: () => <CircularLoader /> }
)

const BottomNavigation = dynamic(
	() => import('components/Navigation/BottomNavigation/BottomNavigation'),
	{ loading: () => <CircularLoader /> }
)

const AppHeader = dynamic(() => import('components/AppBars/AppHeader'), {
	loading: () => <CircularLoader />,
})

interface Props {
	Content: Function
}

const useStyles = makeStyles(theme => ({
	containerStyle: {
		marginTop: '0px',
		marginBottom: '0px',
	},
	contentContainerStyle: {
		padding: '0 2rem',
		[theme.breakpoints.down('lg')]: {
			padding: '0 .5rem',
		},
	},
}))

const PageLayoutComponent = ({ Content }: Props) => {
	const matches = useMediaQuery(screenSizeDrawer)

	const { containerStyle, contentContainerStyle } = useStyles()

	return (
		<>
			<DrawerContextProvider>
				<AppHeader />
			</DrawerContextProvider>

			<BackgroundPaper>
				<Grid container justify='space-evenly' className={containerStyle}>
					{matches && (
						<Grid item lg={3}>
							<NavigationDrawerList />
						</Grid>
					)}
					{Content && typeof Content === 'function' && (
						<Grid item xs={12} lg={9} className={contentContainerStyle}>
							<Content />
						</Grid>
					)}
				</Grid>
			</BackgroundPaper>

			{!matches && <BottomNavigation />}
		</>
	)
}

export default PageLayoutComponent
