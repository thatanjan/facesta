import { useDropzone } from 'react-dropzone'
import React, { useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import PublishIcon from '@material-ui/icons/Publish'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import ImagePreviewModal from 'components/Images/ImagePreview'
import createRequest from 'utils/createRequest'

import { uploadProfilePicture } from 'graphql/mutations/userMutations'

interface Props {
	open: boolean
	setOpen(value: boolean): void
}

const useStyles = makeStyles({
	dialogContentStyle: {
		display: 'grid',
		height: '30vh',
		placeItems: 'center',
	},
	uploadIconStyle: {},
})

const UploadModal = ({ open, setOpen }: Props) => {
	const { dialogContentStyle, uploadIconStyle } = useStyles()

	const [uploading, setUploading] = useState(false)
	const [previewOpen, setPreviewOpen] = useState(false)
	const [rejected, setRejected] = useState(false)
	const [file, setFile] = useState({})

	const action = async (image: ArrayBuffer | string | null) => {
		const data = await createRequest({
			key: uploadProfilePicture,
			values: { image },
		})

		const {
			uploadProfilePicture: { errorMessage, message },
		} = data
	}

	const imagePreviewModalProps = {
		previewOpen,
		setPreviewOpen,
		rejected,
		setRejected,
		file,
		action,
	}

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: 'image/*, video/*',
		maxFiles: 1,
		onDrop: acceptedFiles => {
			const realFile = acceptedFiles[0]

			Object.assign(realFile, {
				previewLink: URL.createObjectURL(realFile),
			})

			setFile(realFile)
			setPreviewOpen(true)
		},
	})

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
				<MuiDialogContent {...getRootProps()} className={dialogContentStyle}>
					<input {...getInputProps()} />
					<PublishIcon className={uploadIconStyle} fontSize='large' />
				</MuiDialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color='primary'>
						Done
					</Button>
				</DialogActions>
			</Dialog>

			<ImagePreviewModal {...imagePreviewModalProps} />
		</>
	)
}

export default UploadModal
