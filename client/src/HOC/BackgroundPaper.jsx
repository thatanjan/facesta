import React from 'react'

import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
	paperPositon: {
		maxWidth: '100vw',
		position: 'relative',
		top: theme.mixins.toolbar.minHeight,
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

const BackgroundPaper = props => {
	console.log(props)
	const { paperPositon } = useStyles()
	return <Paper square elevation={0} {...props} className={paperPositon} />
}

export default BackgroundPaper
