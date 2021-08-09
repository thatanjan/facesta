import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}))

interface Props {
	message: string
	open: boolean
	setOpen: (bool: boolean) => void
}

export default function CustomizedSnackbars({ message, open, setOpen }: Props) {
	const classes = useStyles()

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div className={classes.root}>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='success'>
					{message}
				</Alert>
			</Snackbar>
		</div>
	)
}
