import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done'

const useStyles = makeStyles(({ spacing }) => ({
	buttonStyle: {
		padding: spacing(1),
	},
}))

const FollowButton = () => {
	const { buttonStyle } = useStyles()
	const [FollowState, setFollowState] = useState(false)

	return (
		<Button
			className={buttonStyle}
			color='secondary'
			variant='contained'
			onClick={() => setFollowState(!FollowState)}
			startIcon={FollowState && <DoneIcon />}
		>
			{FollowState ? 'Following' : 'Follow'}
		</Button>
	)
}

export default FollowButton
