import React from 'react'
import dynamic from 'next/dynamic'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import DrawerContextProvider from 'context/drawerContext'
import AppHeader from 'components/AppBars/AppHeader'
import BackgroundPaper from './BackgroundPaper'

const NavigationDrawerList = dynamic(
	() => import('components/Drawers/NavigationDrawerList')
)

interface Props {
	Content?: any
	RightSection?: any
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

export const screenSizeDrawer: string = '(min-width:1280px)'

const PageLayoutComponent = ({ Content, RightSection }: Props) => {
	const isObject = (component: any): boolean => typeof component === 'object'

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
					{matches && isObject(RightSection) && (
						<Grid item md={3}>
							<RightSection />
						</Grid>
					)}
				</Grid>
			</BackgroundPaper>
		</>
	)
}

PageLayoutComponent.defaultProps = {
	Content: false,
	RightSection: false,
}

export default PageLayoutComponent
