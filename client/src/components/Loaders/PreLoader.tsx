import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			display: 'grid',
			placeItems: 'center',
			minWidth: '100vw',
			minHeight: '100vh',
		},
	})
)

export default function CircularLoader() {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	)
}
