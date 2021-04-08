import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import CircularLoader from 'components/Loaders/CircularLoader'

import { useHasLiked } from 'hooks/likeHooks'
import createRequest from 'utils/createRequest'
import { likePost, removeLikePost } from 'graphql/mutations/postMutations'

const AllLovedUser = dynamic(() => import('./AllLovedUser'), {
	loading: () => <CircularLoader />,
})

interface LoveProps {
	postUserID: string
	postID: string
	totalLikes: number
}

const useStyles = makeStyles({
	loveStyle: {
		fill: '#ea0000',
	},
})

const LovePost = ({ totalLikes, postUserID, postID }: LoveProps) => {
	const [showUsers, setShowUsers] = useState(false)
	const [isLoved, setIsLoved] = useState(false)
	const [totalNumberOfLikes, setTotalNumberOfLikes] = useState(0)
	const { loveStyle } = useStyles()

	const { data: hasLikedData, mutate } = useHasLiked({
		postID,
		user: postUserID,
	})

	const hasLiked = hasLikedData?.hasLiked

	useEffect(() => {
		if (typeof hasLiked === 'boolean') {
			setIsLoved(hasLiked)
		}
	}, [hasLiked])

	const clickHandeler = async () => {
		if (isLoved) {
			setTotalNumberOfLikes(prev => prev - 1)
			setIsLoved(!isLoved)
		} else {
			setTotalNumberOfLikes(prev => prev + 1)
			setIsLoved(!isLoved)
		}

		const key = hasLiked ? removeLikePost : likePost
		const values = { postID, user: postUserID }

		const response = await createRequest({ key, values })

		if (response) {
			mutate()
		}
	}

	useEffect(() => {
		setTotalNumberOfLikes(totalLikes)
		setIsLoved(hasLiked)
	}, [totalLikes])

	const style = clsx(isLoved && loveStyle)

	return (
		<Box>
			<Typography variant='caption' onClick={() => setShowUsers(true)}>
				{totalNumberOfLikes}
			</Typography>
			<IconButton aria-label='love' onClick={clickHandeler}>
				<FavoriteIcon className={style} />
			</IconButton>

			{showUsers && (
				<AllLovedUser
					{...{
						showUsers,
						setShowUsers,
						title: 'People who liked this post',
					}}
				/>
			)}
		</Box>
	)
}

export default LovePost
