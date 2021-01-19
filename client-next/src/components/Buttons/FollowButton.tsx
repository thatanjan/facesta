import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import { useIsFollower, useIsFollowing } from 'hooks/useFollow'
import { useUserId } from 'hooks/profileContextHooks'

export const useStyles = makeStyles(({ spacing }) => ({
	buttonStyle: {
		padding: spacing(1),
	},
}))

const FollowButton = () => {
	const { buttonStyle } = useStyles()

	const userId = useUserId()
	const { data: follower } = useIsFollower(userId)
	const { data: following } = useIsFollowing(userId)

	if (!follower) return <div> ...loading </div>
	if (!following) return <div> ...loading </div>

	const {
		getIsFollower: { isFollower },
	} = follower

	const {
		getIsFollowing: { isFollowing },
	} = following

	return (
		<Button className={buttonStyle} color='secondary' variant='contained'>
			{isFollowing && isFollower && 'message'}
			{isFollower && !isFollowing && 'follow back'}
			{!isFollower && isFollowing && 'message'}
			{!isFollower && !isFollowing && 'follow'}
		</Button>
	)
}

export default FollowButton
