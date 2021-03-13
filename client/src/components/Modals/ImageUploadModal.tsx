import { useDropzone } from 'react-dropzone'
import React, { useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
	open: boolean
	setOpen(value: boolean): void
}

const useStyles = makeStyles({
	dropzoneStyle: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		borderWidth: 2,
		borderRadius: 2,
		borderColor: '#eeeeee',
		borderStyle: 'dashed',
		backgroundColor: '#fafafa',
		color: '#bdbdbd',
		outline: 'none',
		transition: 'border .24s ease-in-out',
	},
	activeStyle: {
		borderColor: '#2196f3',
	},
	acceptStyle: {
		borderColor: '#00e676',
	},
	rejectStyle: {
		borderColor: '#ff1744',
	},
})

const UploadModal = ({ open, setOpen }: Props) => {
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<Dialog
				onClose={handleClose}
				aria-labelledby='simple-dialog-title'
				open={open}
			>
				<DialogTitle id='simple-dialog-title'>Upload your Image</DialogTitle>
				<Button onClick={handleClose}>Done</Button>
			</Dialog>
		</>
	)
}

export default UploadModal
