import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
	},
}))

interface Props {
	message: string
	severity: 'error' | 'info' | 'success' | 'warning'
}

export default function CustomizedSnackbars({ message, severity }: Props) {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)

	const handleClose = (_?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	return (
		<div className={classes.root}>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severity}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	)
}
