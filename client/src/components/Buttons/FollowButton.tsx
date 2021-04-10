import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { mutate } from 'swr'
import dynamic from 'next/dynamic'

import CircularLoader from 'components/Loaders/CircularLoader'
import createRequest from 'utils/createRequest'
import { useIsFollower, useIsFollowee } from 'hooks/followHooks'
import { useProfileUserID } from 'hooks/profileContextHooks'
import { follow, unfollow } from 'graphql/mutations/followMutations'
import {
	getIsFollower,
	getIsFollowee,
	getFollowees,
	getFollowers,
} from 'graphql/queries/followQueries'

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

export const useStyles = makeStyles(({ spacing }) => ({
	buttonStyle: {
		padding: spacing(1),
	},
}))

let buttonText: string

const FollowButton = () => {
	const { buttonStyle } = useStyles()

	const profileUserId = useProfileUserID()

	const { data: follower, error: followerError } = useIsFollower()
	const { data: followee, error: followeeError } = useIsFollowee()

	if (followerError || followeeError) return <SwrErrorAlert />

	if (!follower || !followee) return <CircularLoader />

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
		mutate([getFollowees, profileUserId])
	}

	const followMutation = async () => {
		await createRequest({
			key: follow,
			values: { user: profileUserId },
		})
		mutateData()
	}

	const unFollowMutation = async () => {
		await createRequest({
			key: unfollow,
			values: { user: profileUserId },
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
