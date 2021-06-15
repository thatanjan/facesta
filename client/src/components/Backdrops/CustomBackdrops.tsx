import React, { useState, useEffect } from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff',
		},
	})
)

const SimpleBackdrop = () => {
	const { backdrop } = useStyles()

	const [open, setOpen] = useState(false)

	useEffect(() => {
		setOpen(true)
	}, [])

	return (
		<div>
			<Backdrop className={backdrop} open={open} onClick={() => setOpen(false)}>
				<CircularProgress color='primary' />
			</Backdrop>
		</div>
	)
}

export default SimpleBackdrop
