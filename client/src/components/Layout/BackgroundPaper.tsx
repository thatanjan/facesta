import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: any) => ({
	paperStyle: {
		maxWidth: '100vw',
		maxHeight: '100vh',
		overflow: 'hidden',
		position: 'relative',
		/* top: theme.mixins.toolbar.minHeight, */
		minHeight: '100vh',
		[theme.breakpoints.down('lg')]: {
			paddingBottom: '56px',
		},
		[theme.breakpoints.up('xs')]: {
			paddingTop:
				theme.mixins.toolbar['@media (min-width:0px) and (orientation: landscape)']
					.minHeight,
		},
		[theme.breakpoints.up('xs')]: {
			paddingTop: theme.mixins.toolbar.minHeight,
		},
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.mixins.toolbar['@media (min-width:600px)'].minHeight,
		},
	},
}))

const BackgroundPaper = (props: { [key: string]: any }) => {
	const { paperStyle } = useStyles()
	return (
		<Grid
			component={Paper}
			container
			justify='space-evenly'
			square
			elevation={0}
			{...props}
			className={paperStyle}
		/>
	)
}

export default BackgroundPaper
