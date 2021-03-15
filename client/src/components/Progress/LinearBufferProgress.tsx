import { useState, useRef, useEffect, ReactElement, forwardRef, Ref } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TransitionProps } from '@material-ui/core/transitions'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'

export const FAILED = 'failed'

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
})


type SetStateBool = (bool: boolean)  => void

interface Props {
	open: boolean
	setOpen: SetStateBool
	success: boolean | string | null
	shouldStop: boolean
	setShouldStop: SetStateBool
}

const Transition = forwardRef(function Transition(
	props: TransitionProps & { children?: ReactElement<any, any> },
	ref: Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />
})

const LinearBuffer = ({open, setOpen, shouldStop, setShouldStop, success }: Props) => {
	const classes = useStyles() 
	const [progress, setProgress] = useState(0)
	const [buffer, setBuffer] = useState(10)

	useEffect(() => {
		if (success === FAILED) {
			setShouldStop(true)
			setProgress(0)
			setBuffer(0)
		}

		if (success) {
			setProgress(100)
			setBuffer(100)

			setShouldStop(true)
		}
	}, [success, shouldStop])

	const progressRef = useRef(() => {})
	useEffect(() => {
		progressRef.current = () => {
			if (shouldStop) {
				return true
			}

			if (progress === 90 && shouldStop === false) {
				return true
			}

			if (progress > 100) {
				setTimeout(() => {
					setProgress(0)
					setBuffer(10)
				}, 2000)
			} else {
				const diff = Math.random() * 10
				const diff2 = Math.random() * 10
				setProgress(progress + diff)
				setBuffer(progress + diff + diff2)
			}
		}
	})

	useEffect(() => {
		const timer = setInterval(() => {
			progressRef.current()
		}, 500)

		return () => {
			clearInterval(timer)
		}
	}, [])

	const handleClose = () => setOpen(false)

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-labelledby='alert-dialog-slide-title'
			aria-describedby='alert-dialog-slide-description'
		>
			<LinearProgress variant='buffer' value={progress} valueBuffer={buffer} />
		</Dialog>
	)
}

export default LinearBuffer
