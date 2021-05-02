import { useDropzone } from 'react-dropzone'
import DialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import PublishIcon from '@material-ui/icons/Publish'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import makeBase64 from 'utils/makeBase64Image'

import { Base64 } from 'redux/slices/profilePictureUpload'

export type NullOrBooleanType = boolean | null

const useStyles = makeStyles({
	dialogContentStyle: {
		display: 'grid',
		height: '30vh',
		placeItems: 'center',
	},
	uploadIconStyle: {},
})

interface Props {
	closeModal: () => void
	uploadModal: boolean
	makeImage: (base64: Base64) => {}
	openPreviewModal: (link: string) => void
}

const UploadModal = ({
	closeModal,
	uploadModal,
	makeImage,
	openPreviewModal,
}: Props) => {
	const { dialogContentStyle, uploadIconStyle } = useStyles()

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*, video/*',
		maxFiles: 1,
		onDrop: acceptedFiles => {
			const realFile = acceptedFiles[0]

			const fileWithPreviewLink = Object.assign(realFile, {
				previewLink: URL.createObjectURL(realFile),
				valid: true,
			})

			openPreviewModal(fileWithPreviewLink.previewLink)

			makeBase64(fileWithPreviewLink, makeImage)

			closeModal()
		},
	})

	return (
		<>
			<Dialog
				onClose={closeModal}
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
					<Button autoFocus onClick={closeModal} color='primary'>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default UploadModal
