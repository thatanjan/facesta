import React from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

import dynamic from 'next/dynamic'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
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

const RightNavigation = dynamic(
	() => import('components/Navigation/RightNavigation/RightNavigation'),
	{
		loading: () => <CircularLoader />,
	}
)

interface Props {
	Content: Function
}

const useStyles = makeStyles(theme => ({
	contentSection: {
		maxHeight: '100vh',
		overflowY: 'scroll',
		padding: '0 2rem',
		[theme.breakpoints.down('lg')]: {
			padding: '0 1rem',
		},
		'-ms-overflow-style': 'none',
		scrollbarWidth: 'none',

		'& ::-webkit-scrollbar': {
			display: 'none',
		},

		'& .simplebar-vertical': {
			'& .simplebar-scrollbar::before': {
				background: '#d0d0d0',
			},
		},
	},
	contentContainerStyle: {
		paddingBottom: '10rem',
	},
}))

const PageLayoutComponent = ({ Content }: Props) => {
	const matches = useMediaQuery(screenSizeDrawer)

	const { contentSection, contentContainerStyle } = useStyles()

	return (
		<>
			<DrawerContextProvider>
				<AppHeader />
			</DrawerContextProvider>

			<BackgroundPaper>
				{matches && (
					<Grid item lg={3}>
						<NavigationDrawerList />
					</Grid>
				)}
				{Content && typeof Content === 'function' && (
					<Grid
						component={SimpleBar}
						id='scrollableDiv'
						item
						xs={12}
						lg={6}
						className={contentSection}
					>
						<Box className={contentContainerStyle}>
							<Content />
						</Box>
					</Grid>
				)}

				{matches && (
					<Grid item xs={12} lg={3}>
						<RightNavigation />
					</Grid>
				)}
			</BackgroundPaper>

			{!matches && <BottomNavigation />}
		</>
	)
}

export default PageLayoutComponent
