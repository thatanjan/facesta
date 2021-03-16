import Dialog from '@material-ui/core/Dialog'
import CardMedia from '@material-ui/core/CardMedia'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'

interface Props {
	previewLink: string
	showPreview: boolean
	setApproved: (bool: boolean) => void
}

const ImagePreviewModal = ({
	previewLink,
	showPreview,
	setApproved,
}: Props) => {
	const handleClose = () => {
		setApproved(true)
	}

	const handleReject = () => {
		setApproved(false)
	}

	return (
		<Dialog
			fullWidth
			aria-labelledby='simple-dialog-title'
			maxWidth='lg'
			open={showPreview}
		>
			<DialogContent style={{ padding: 0 }}>
				<CardMedia
					style={{ height: 0, paddingTop: '56.25%' }}
					image={previewLink}
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
