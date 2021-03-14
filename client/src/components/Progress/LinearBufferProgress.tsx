import { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

export const FAILED = 'failed'

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
})

interface Props {
	success: boolean | string
	shouldStop: boolean
	setShouldStop: (bool: boolean) => void
}

const LinearBuffer = ({ shouldStop, setShouldStop, success }: Props) => {
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

	return (
		<div className={classes.root}>
			<LinearProgress variant='buffer' value={progress} valueBuffer={buffer} />
		</div>
	)
}

export default LinearBuffer
