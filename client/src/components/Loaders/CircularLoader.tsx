import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			display: 'flex',
			placeContent: 'center',
			margin: '1rem 0',
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
