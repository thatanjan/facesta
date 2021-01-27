import React, { ReactNode } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import DrawerContextProvider from 'context/drawerContext'
import AppHeader from 'components/AppHeader/AppHeader'
import BackgroundPaper from './BackgroundPaper'

interface Props {
	Drawer?: boolean | ReactNode
	Content?: boolean | ReactNode
	RightSection?: boolean | ReactNode
}

const useStyles = makeStyles({
	containerStyle: {
		marginTop: '0px',
		marginBottom: '0px',
	},
})

export const screenSizeDrawer: string = '(min-width:960px)'

const PageLayoutComponent = ({ Drawer, Content, RightSection }: Props) => {
	const matches = useMediaQuery(screenSizeDrawer)

	const { containerStyle } = useStyles()

	const contentWidth = () => {
		if (Drawer && !RightSection) {
			return 8
		}
		if (!Drawer && RightSection) {
			return 8
		}
		return 6
	}

	return (
		<>
			<DrawerContextProvider>
				<AppHeader />
			</DrawerContextProvider>

			<BackgroundPaper>
				<Grid
					container
					spacing={Drawer && RightSection ? 2 : 0}
					justify='space-evenly'
					className={containerStyle}
				>
					{matches && typeof Drawer === 'function' && (
						<Grid item md={3}>
							<Drawer />
						</Grid>
					)}
					{Content && typeof Content === 'function' && (
						<Grid item xs={10} md={contentWidth()}>
							<Content />
						</Grid>
					)}
					{matches && typeof RightSection === 'function' && (
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
	Drawer: false,
	Content: false,
	RightSection: false,
}

export default PageLayoutComponent
