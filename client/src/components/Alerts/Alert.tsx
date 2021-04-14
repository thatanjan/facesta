import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import Slide from '@material-ui/core/Slide'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

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

export interface Props {
	severity: 'error' | 'success' | 'info'
	message: string
	checked: boolean
}

export default function DescriptionAlerts({
	severity,
	message,
	checked,
}: Props) {
	const classes = useStyles()

	const [open, setOpen] = useState(true)

	return (
		<Slide
			direction='up'
			in={checked}
			mountOnEnter
			unmountOnExit
			timeout={{ exit: 3 }}
		>
			<div className={classes.root}>
				<Collapse in={open}>
					<Alert
						severity={severity}
						action={
							<IconButton
								aria-label='close'
								color='inherit'
								size='small'
								onClick={() => {
									setOpen(false)
								}}
							>
								<CloseIcon fontSize='inherit' />
							</IconButton>
						}
					>
						<AlertTitle style={{ textTransform: 'capitalize' }}>
							{severity}
						</AlertTitle>
						{message}
					</Alert>
				</Collapse>
			</div>
		</Slide>
	)
}
