import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'

import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			zIndex: theme.zIndex.drawer + 1,
		},
	})
)

export default function CircularLoader() {
	const classes = useStyles()

	return (
		<Backdrop open className={classes.root}>
			<CircularProgress />
		</Backdrop>
	)
}
