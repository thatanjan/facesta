import Dialog from '@material-ui/core/Dialog'
import CardMedia from '@material-ui/core/CardMedia'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'

import makeBase64Image from 'utils/makeBase64Image'
import { useEffect, useState } from 'react'

export interface CustomFile extends File {
	previewLink: string
}

interface Props {
	previewOpen: boolean
	setPreviewOpen: Function
	setRejected: (bool: boolean) => void
	file: CustomFile
	action: (file: ArrayBuffer | null | string) => void
	setUploadModalOpen: (bool: boolean) => void
	setLoadingModalOpen: Function
}

const ImagePreviewModal = ({
	setPreviewOpen,
	previewOpen,
	file,
	setRejected,
	action,
	setUploadModalOpen,
	setLoadingModalOpen,
}: Props) => {
	const handleClose = () => {
		// setShowProgress(true)
		makeBase64Image(file, action)
		setPreviewOpen(false)
		setLoadingModalOpen(true)
	}

	const handleReject = () => {
		setRejected(true)
		setPreviewOpen(false)
		setUploadModalOpen(true)
	}

	return (
		<Dialog
			fullWidth
			aria-labelledby='simple-dialog-title'
			maxWidth='lg'
			open={previewOpen}
		>
			<DialogContent style={{ padding: 0 }}>
				<CardMedia
					style={{ height: 0, paddingTop: '56.25%' }}
					image={file.previewLink}
				/>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleReject}>discard</Button>
				<Button onClick={handleClose}>OK</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ImagePreviewModal
