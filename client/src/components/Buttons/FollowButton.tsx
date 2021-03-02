import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { mutate } from 'swr'

import createRequest from 'utils/createRequest'
import { useIsFollower, useIsFollowee } from 'hooks/useFollow'
import { useProfileUserId } from 'hooks/profileContextHooks'
import { follow, unfollow } from 'graphql/mutations/followMutations'
import {
	getIsFollower,
	getIsFollowee,
	getFollowee,
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

	const profileUserId = useProfileUserId()

	const { data: follower } = useIsFollower()
	const { data: followee } = useIsFollowee()

	if (!follower) return <div> ...loading </div>
	if (!followee) return <div> ...loading </div>

	let clickHandeler: () => void

	const {
		getIsFollower: { isFollower },
	} = follower

	const {
		getIsFollowee: { isFollowee },
	} = followee

	const UNFOLLOW = 'unfollow'
	const FOLLOW = 'follow'

	const mutateData = () => {
		mutate([getIsFollowee, profileUserId])
		mutate([getIsFollower, profileUserId])
		mutate([getFollowers, profileUserId])
		mutate([getFollowee, profileUserId])
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

	if (isFollowee) {
		buttonText = UNFOLLOW
		clickHandeler = unFollowMutation
	}

	if (!isFollowee) {
		buttonText = FOLLOW
		clickHandeler = followMutation
	}

	if (isFollower) {
		buttonText = `${FOLLOW} back`
		clickHandeler = followMutation
	}

	if (isFollowee && isFollower) {
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
