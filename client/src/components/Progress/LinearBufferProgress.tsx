import { useState, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
})

const LinearBuffer = () => {
	const classes = useStyles()
	const [progress, setProgress] = useState(0)
	const [buffer, setBuffer] = useState(10)

	const progressRef = useRef(() => {})
	useEffect(() => {
		progressRef.current = () => {
			if (progress > 100) {
				setProgress(0)
				setBuffer(10)
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
