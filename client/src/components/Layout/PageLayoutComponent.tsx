import React from 'react'
import dynamic from 'next/dynamic'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import DrawerContextProvider from 'context/drawerContext'
import AppHeader from 'components/AppBars/AppHeader'
import { screenSizeDrawer } from 'variables/global'
import BackgroundPaper from './BackgroundPaper'

const NavigationDrawerList = dynamic(
	() => import('components/Drawers/NavigationDrawerList')
)

const BottomNavigation = dynamic(
	() => import('components/Navigation/BottomNavigation/BottomNavigation')
)

interface Props {
	Content: Function
}

const useStyles = makeStyles({
	containerStyle: {
		marginTop: '0px',
		marginBottom: '0px',
	},
	contentContainerStyle: {
		padding: '0 2rem',
	},
})

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
						<Grid item xs={11} lg={9} className={contentContainerStyle}>
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
