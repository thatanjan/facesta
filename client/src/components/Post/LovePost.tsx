import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import AutoHideSnackBar from 'components/Alerts/AutoHideSnackBar'
import CircularLoader from 'components/Loaders/CircularLoader'

import createRequest from 'utils/createRequest'
import { likePost, removeLikePost } from 'graphql/mutations/postMutations'

const AllLovedUser = dynamic(() => import('./AllLovedUser'), {
	loading: () => <CircularLoader />,
})

interface LoveProps {
	postUserID: string
	postID: string
	totalLikes: number
	hasLiked: boolean
}

const useStyles = makeStyles({
	loveStyle: {
		fill: '#ea0000',
	},
	numberOfLikes: {
		textDecoration: 'underline',
		'&:hover': {
			cursor: 'pointer',
		},
	},
})

const LovePost = ({ totalLikes, postUserID, postID, hasLiked }: LoveProps) => {
	const [showUsers, setShowUsers] = useState(false)
	const [isLiked, setIsLiked] = useState(hasLiked)
	const [totalNumberOfLikes, setTotalNumberOfLikes] = useState(0)
	const { loveStyle, numberOfLikes } = useStyles()
	const [error, setError] = useState(false)
	const [message, setMessage] = useState('')
	const [disableButton, setDisableButton] = useState(false)

	const clickHandeler = async () => {
		setDisableButton(true)
		if (isLiked) {
			setTotalNumberOfLikes(prev => prev - 1)
			setIsLiked(!isLiked)
		} else {
			setTotalNumberOfLikes(prev => prev + 1)
			setIsLiked(!isLiked)
		}

		const key = isLiked ? removeLikePost : likePost
		const values = { postID, user: postUserID }

		try {
			const response = await createRequest({ key, values })

			if (response) {
				setDisableButton(false)
			}

			const likeErrorMessage = response.likePost?.errorMessage
			const removeLikeErrorMessage = response.removeLikePost?.errorMessage

			if (likeErrorMessage || removeLikeErrorMessage) {
				setError(true)
				setMessage(likeErrorMessage || removeLikeErrorMessage)
				setTimeout(() => {
					setError(false)
				}, 3000)
			}
		} catch (e) {
			setError(true)
			setMessage(e.message)
			setTimeout(() => {
				setError(false)
			}, 3000)
		}
	}

	useEffect(() => {
		setTotalNumberOfLikes(totalLikes)
		setIsLiked(hasLiked)
	}, [totalLikes])

	const style = clsx(isLiked && loveStyle)

	return (
		<Box>
			<Typography
				variant='caption'
				className={numberOfLikes}
				onClick={() => setShowUsers(true)}
			>
				{totalNumberOfLikes}
			</Typography>
			<IconButton
				aria-label='love'
				onClick={clickHandeler}
				disabled={disableButton}
			>
				<FavoriteIcon className={style} />
			</IconButton>

			{error && <AutoHideSnackBar {...{ message, severity: 'error' }} />}

			{showUsers && (
				<AllLovedUser
					{...{
						showUsers,
						setShowUsers,
						title: 'People who liked this post',
						idOfPost: postID,
						idOfPostUser: postUserID,
					}}
				/>
			)}
		</Box>
	)
}

export default LovePost
