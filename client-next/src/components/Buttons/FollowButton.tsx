import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { mutate } from 'swr'

import createRequest from 'utils/createRequest'
import { useIsFollower, useIsFollowing } from 'hooks/useFollow'
import { useUserId } from 'hooks/profileContextHooks'
import { useUserID as useOwnerId } from 'hooks/userhooks'
import { follow, unfollow } from 'graphql/mutations/FollowMutations'
import { getIsFollower, getIsFollowing } from 'graphql/queries/followQueries'

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
	const FOLLOW = 'follow'

	const mutateData = () => {
		mutate([getIsFollowing, userId])
		mutate([getIsFollower, userId])
	}

	const followMutation = async () => {
		const data = await createRequest({
			mutation: follow,
			values: { userId },
		})
		mutateData()
	}

	const unFollowMutation = async () => {
		const data = await createRequest({
			mutation: unfollow,
			values: { userId },
		})
		mutateData()
	}

	if (isFollowing) {
		buttonText = UNFOLLOW
		clickHandeler = unFollowMutation
	}

	if (!isFollowing) {
		buttonText = FOLLOW
	}

	if (isFollower) {
		buttonText = `${FOLLOW} back`
		clickHandeler = followMutation
	}

	if (isFollowing && isFollower) {
		buttonText = UNFOLLOW
		clickHandeler = unFollowMutation
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
