import { useDropzone } from 'react-dropzone'
import DialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import PublishIcon from '@material-ui/icons/Publish'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import makeBase64 from 'utils/makeBase64Image'

import { useAppSelector, useAppDispatch } from 'redux/hooks/hooks'
import {
	closeUploadModal,
	openPreviewModal,
	makeBase64Image,
	Base64,
} from 'redux/slices/profilePictureUpload'

export type NullOrBooleanType = boolean | null

const useStyles = makeStyles({
	dialogContentStyle: {
		display: 'grid',
		height: '30vh',
		placeItems: 'center',
	},
	uploadIconStyle: {},
})

const UploadModal = () => {
	const { dialogContentStyle, uploadIconStyle } = useStyles()

	const { uploadModal } = useAppSelector(state => state.profilePictureUpload)
	const dispatch = useAppDispatch()

	const handleClose = () => {
		dispatch(closeUploadModal())
	}

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*, video/*',
		maxFiles: 1,
		onDrop: acceptedFiles => {
			const realFile = acceptedFiles[0]

			const fileWithPreviewLink = Object.assign(realFile, {
				previewLink: URL.createObjectURL(realFile),
				valid: true,
			})

			dispatch(openPreviewModal(fileWithPreviewLink.previewLink))

			makeBase64(fileWithPreviewLink, (base64: Base64) =>
				dispatch(makeBase64Image(base64))
			)

			handleClose()
		},
	})

	return (
		<>
			<Dialog
				onClose={handleClose}
				aria-labelledby='simple-dialog-title'
				open={uploadModal}
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
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default UploadModal
