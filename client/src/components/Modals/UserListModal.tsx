import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

interface Props {
	showUsers: boolean
	setShowUsers: (e: boolean) => void
	title: string
	InfiniteScroll: React.ElementType
}

const UserListModal = ({
	setShowUsers,
	showUsers,
	title,
	InfiniteScroll,
}: Props) => {
	const [scroll] = React.useState<DialogProps['scroll']>('paper')

	const handleClose = () => {
		setShowUsers(false)
	}

	const descriptionElementRef = React.useRef<HTMLElement>(null)
	React.useEffect(() => {
		if (showUsers) {
			const { current: descriptionElement } = descriptionElementRef
			if (descriptionElement !== null) {
				descriptionElement.focus()
			}
		}
	}, [showUsers])

	return (
		<div>
			<Dialog
				open={showUsers}
				onClose={handleClose}
				scroll={scroll}
				aria-labelledby='scroll-dialog-title'
				aria-describedby='scroll-dialog-description'
			>
				<DialogTitle id='scroll-dialog-title'>{title}</DialogTitle>
				<DialogContent dividers>
					<InfiniteScroll>
						<h1> hello </h1>
					</InfiniteScroll>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default UserListModal
