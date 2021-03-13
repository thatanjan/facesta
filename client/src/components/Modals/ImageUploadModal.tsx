import { useDropzone } from 'react-dropzone'
import React, { useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/DialogContentText'
import MuiDialogActions from '@material-ui/core/DialogActions'
import PublishIcon from '@material-ui/icons/Publish'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import DialogActions from '@material-ui/core/DialogActions'

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
	dialogContentStyle: {
		display: 'grid',
		height: '30vh',
		placeItems: 'center',
	},
	uploadIconStyle: {},
})

const UploadModal = ({ open, setOpen }: Props) => {
	const { dialogContentStyle, uploadIconStyle } = useStyles()

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<Dialog
				onClose={handleClose}
				aria-labelledby='simple-dialog-title'
				open={open}
				maxWidth='sm'
				fullWidth
			>
				<DialogTitle style={{ textAlign: 'center' }} id='simple-dialog-title'>
					Upload your Image
				</DialogTitle>
				<MuiDialogContent className={dialogContentStyle}>
					<PublishIcon className={uploadIconStyle} fontSize='large' />
				</MuiDialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color='primary'>
						Done
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default UploadModal
