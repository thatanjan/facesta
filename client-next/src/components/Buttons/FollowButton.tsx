import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import createRequest from 'utils/createRequest'
import { useIsFollower, useIsFollowing } from 'hooks/useFollow'
import { useUserId } from 'hooks/profileContextHooks'
import { useUserID as useOwnerId } from 'hooks/userhooks'
import { follow } from 'graphql/mutations/FollowMutations'

export const useStyles = makeStyles(({ spacing }) => ({
	buttonStyle: {
		padding: spacing(1),
	},
}))

const FollowButton = () => {
	const { buttonStyle } = useStyles()

	let buttonText: string

	const userId = useUserId()
	const ownerId = useOwnerId()

	const { data: follower } = useIsFollower(userId)
	const { data: following } = useIsFollowing(userId)

	if (!follower) return <div> ...loading </div>
	if (!following) return <div> ...loading </div>

	let clickHandeler: () => void

	const {
		getIsFollower: { isFollower },
	} = follower

	const {
		getIsFollowing: { isFollowing },
	} = following

	const UNFOLLOW = 'unfollow'

	if (!isFollowing && !isFollower) {
		buttonText = 'follow'
		clickHandeler = async () => {
			const data = await createRequest({
				mutation: follow,
				values: { userId },
			})
		}
	}

	if (isFollowing && isFollower) {
		buttonText = UNFOLLOW
	}

	if (!isFollowing && isFollower) {
		buttonText = 'follow back'
	}

	if (!isFollower && isFollowing) {
		buttonText = UNFOLLOW
	}

	return (
		<Button
			className={buttonStyle}
			color='secondary'
			variant='contained'
			onClick={() => clickHandeler()}
		>
			{buttonText}
		</Button>
	)
}

export default FollowButton
