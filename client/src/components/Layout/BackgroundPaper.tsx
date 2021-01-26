import React from 'react'

import Paper from '@material-ui/core/Paper'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: any) => ({
	paperStyle: {
		maxWidth: '100vw',
		position: 'relative',
		top: theme.mixins.toolbar.minHeight,
		minHeight: '100vh',
		[theme.breakpoints.up('xs')]: {
			top:
				theme.mixins.toolbar['@media (min-width:0px) and (orientation: landscape)']
					.minHeight,
		},
		[theme.breakpoints.up('xs')]: {
			top: theme.mixins.toolbar.minHeight,
		},
		[theme.breakpoints.up('sm')]: {
			top: theme.mixins.toolbar['@media (min-width:600px)'].minHeight,
		},
	},
}))

const BackgroundPaper = (props: { [key: string]: any }) => {
	const { paperStyle } = useStyles()
	return <Paper square elevation={0} {...props} className={paperStyle} />
}

export default BackgroundPaper
