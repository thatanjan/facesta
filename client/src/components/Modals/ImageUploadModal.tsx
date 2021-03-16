import { useDropzone } from 'react-dropzone'
import DialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import PublishIcon from '@material-ui/icons/Publish'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

export type NullOrBooleanType = boolean | null

interface Props {
	setFile: Function
	uploadModalOpen: boolean
	setUploadModalOpen: (bool: boolean) => void
	setApproved: (param: NullOrBooleanType) => void
}

const useStyles = makeStyles({
	dialogContentStyle: {
		display: 'grid',
		height: '30vh',
		placeItems: 'center',
	},
	uploadIconStyle: {},
})

const UploadModal = ({
	uploadModalOpen,
	setUploadModalOpen,
	setFile,
	setApproved,
}: Props) => {
	const { dialogContentStyle, uploadIconStyle } = useStyles()

	const handleClose = () => {
		setUploadModalOpen(false)
	}

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*, video/*',
		maxFiles: 1,
		onDrop: acceptedFiles => {
			const realFile = acceptedFiles[0]

			Object.assign(realFile, {
				previewLink: URL.createObjectURL(realFile),
				valid: true,
			})

			setFile(realFile)
			setApproved(null)
			handleClose()
		},
	})

	return (
		<>
			<Dialog
				onClose={handleClose}
				aria-labelledby='simple-dialog-title'
				open={uploadModalOpen}
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
