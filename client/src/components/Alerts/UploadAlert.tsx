import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Alert, AlertTitle } from '@material-ui/lab'
import Slide from '@material-ui/core/Slide'

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
	checked: boolean
}

export default function DescriptionAlerts({
	severity,
	message,
	checked,
}: Props) {
	const classes = useStyles()

	return (
		<Slide
			direction='up'
			in={checked}
			mountOnEnter
			unmountOnExit
			timeout={{ exit: 3 }}
		>
			<div className={classes.root}>
				<Alert severity={severity}>
					<AlertTitle style={{ textTransform: 'capitalize' }}>{severity}</AlertTitle>
					{message}
				</Alert>
			</div>
		</Slide>
	)
}
