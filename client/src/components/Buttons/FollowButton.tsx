import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { mutate } from 'swr'

import createRequest from 'utils/createRequest'
import { useIsFollower, useIsFollowing } from 'hooks/useFollow'
import { useProfileUserId } from 'hooks/profileContextHooks'
import { useOwnUserId } from 'hooks/userhooks'
import { follow, unfollow } from 'graphql/mutations/followMutations'
import {
	getIsFollower,
	getIsFollowing,
	getFollowing,
	getFollowers,
} from 'graphql/queries/followQueries'

export const useStyles = makeStyles(({ spacing }) => ({
	buttonStyle: {
		padding: spacing(1),
	},
}))

let buttonText: string

const FollowButton = () => {
	const { buttonStyle } = useStyles()

	const ownUserId = useOwnUserId()
	const profileUserId = useProfileUserId()

	const { data: follower } = useIsFollower(profileUserId)
	const { data: following } = useIsFollowing(profileUserId)

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
		mutate([getIsFollowing, profileUserId])
		mutate([getIsFollower, profileUserId])
		mutate([getFollowers, profileUserId])
		mutate([getFollowing, profileUserId])
	}

	const followMutation = async () => {
		await createRequest({
			key: follow,
			values: { otherUserId: profileUserId },
		})
		mutateData()
	}

	const unFollowMutation = async () => {
		await createRequest({
			key: unfollow,
			values: { otherUserId: profileUserId },
		})
		mutateData()
	}

	if (isFollowing) {
		buttonText = UNFOLLOW
		clickHandeler = unFollowMutation
	}

	if (!isFollowing) {
		buttonText = FOLLOW
		clickHandeler = followMutation
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
