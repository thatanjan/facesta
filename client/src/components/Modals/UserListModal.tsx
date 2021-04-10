import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

interface Props {
	showUsers: boolean
	setShowUsers: (e: boolean) => void
	title: string
	children: React.ReactNode
}

const UserListModal = ({ setShowUsers, showUsers, title, children }: Props) => {
	const [scroll] = React.useState<DialogProps['scroll']>('paper')
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

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
				fullScreen={fullScreen}
				fullWidth
				open={showUsers}
				onClose={handleClose}
				scroll={scroll}
				maxWidth='sm'
			>
				<DialogTitle id='scroll-dialog-title'>{title}</DialogTitle>
				<DialogContent dividers>{children}</DialogContent>
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
