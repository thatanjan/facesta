import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Alert, AlertTitle } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			'& > * + *': {
				marginTop: theme.spacing(2),
			},
		},
	})
)

interface Props {
	severity: 'error' | 'info' | 'success' | 'warning'
	message: 'string'
}

export default function DescriptionAlerts({ severity, message }: Props) {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Alert severity={severity}>
				<AlertTitle style={{ textTransform: 'capitalize' }}>{severity}</AlertTitle>
				{message}
			</Alert>
		</div>
	)
}
