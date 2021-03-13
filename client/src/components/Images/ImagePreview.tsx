import Dialog from '@material-ui/core/Dialog'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'

import { AnyObject } from 'interfaces/global'
import makeBase64Image from 'utils/makeBase64Image'

interface Props {
	previewOpen: boolean
	setPreviewOpen: Function
	previewLink: string
	setRejected: (bool: boolean) => void
	file: File
	action: (file: ArrayBuffer | null | string) => void
}

const ImagePreviewModal = ({
	setPreviewOpen,
	previewOpen,
	previewLink,
	file,
	action,
	setRejected,
}: Props) => {
	const handleClose = () => {
		const base64Image = makeBase64Image(file)()
		action(base64Image)
		setPreviewOpen(false)
	}

	const handleReject = () => {
		setRejected(true)
		setPreviewOpen(false)
	}

	return (
		<Dialog open={previewOpen}>
			<DialogContent>
				<Card>
					<CardMedia image={previewLink} />
				</Card>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleReject}>disgard</Button>
				<Button onClick={handleClose}>OK</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ImagePreviewModal
