import { forwardRef, ReactElement, Ref, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'

import LinearBufferProgress, {
	FAILED,
} from 'components/Progress/LinearBufferProgress'

const Transition = forwardRef(function Transition(
	props: TransitionProps & { children?: ReactElement<any, any> },
	ref: Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />
})

interface Props {
	open: boolean
	setOpen: Function
	title: string
}

export default function AlertDialogSlide({ open, title, setOpen }: Props) {
	const [success, setSuccess] = useState(false)
	const [shouldStop, setShouldStop] = useState(false)

	const ProgressBarProps = { success, shouldStop, setShouldStop }

	const handleClose = () => {
		if (success) {
			setTimeout(() => {
				setOpen(false)
			}, 1500)
		}
	}

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle id='alert-dialog-slide-title'>{title}</DialogTitle>
				<DialogContent>
					<LinearBufferProgress {...ProgressBarProps} />
				</DialogContent>
			</Dialog>
		</div>
	)
}
