import React, { useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ReactInfiniteScroll from 'react-infinite-scroll-component'
import { nanoid } from 'nanoid'
import Box from '@material-ui/core/Box'
import dynamic from 'next/dynamic'

import { useGetAllComments, Input as HookInput } from 'hooks/commentHooks'
import { Comment } from 'interfaces/post'

import Alert from 'components/Alerts/Alert'
import CircularLoader from 'components/Loaders/CircularLoader'

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))
const SingleComment = dynamic(() => import('components/Post/Comment'))

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			backgroundColor: theme.palette.background.paper,
		},
		listItemStyle: {
			[theme.breakpoints.down('xs')]: {
				paddingLeft: '5px',
				paddingRight: '5px',
			},
		},
		dividerStyle: {
			[theme.breakpoints.down('xs')]: {
				marginLeft: '61px',
			},
		},
	})
)

interface Props extends HookInput {
	newCommentAdded: boolean
}

const QUERY_NAME = 'getAllComments'

const CommentList = ({ postID, newCommentAdded }: Props) => {
	const { root } = useStyles()

	const { data, error, setSize, size, mutate } = useGetAllComments({
		postID,
	})

	useEffect(() => {
		if (newCommentAdded) {
			mutate()
		}
	}, [newCommentAdded])

	if (!data) return <CircularLoader />
	if (error) return <SwrErrorAlert />

	let isLoadingMore = true

	let errorFromServer = false

	let allComments: Comment[] = []

	try {
		const lastResponse = data[size - 1]

		if (lastResponse && lastResponse[QUERY_NAME]) {
			const { errorMessage } = lastResponse[QUERY_NAME]

			if (errorMessage) {
				errorFromServer = true
			}

			const { comments } = lastResponse[QUERY_NAME]

			if (
				Array.isArray(comments) &&
				(comments.length === 0 || comments.length < 10)
			) {
				isLoadingMore = false
			}
		}

		data.forEach(element => {
			allComments = [...allComments, ...element.getAllComments.comments]
		})
	} catch (_) {
		return <Alert checked severity='error' message='Please try again' />
	}

	if (allComments.length === 0)
		return <Alert checked severity='info' message='This post has no comments' />

	return (
		<>
			<List
				className={root}
				component={ReactInfiniteScroll}
				dataLength={allComments.length}
				next={() => setSize(size + 1)}
				hasMore={isLoadingMore as boolean}
				scrollableTarget='scrollableDiv'
				loader={<CircularLoader />}
			>
				{Array.isArray(data) &&
					allComments.map((comment: Comment) => (
						<Box key={nanoid()}>
							<SingleComment {...comment} mutateCommentsList={mutate} />{' '}
						</Box>
					))}
			</List>

			{(error || errorFromServer) && (
				<Alert checked severity='error' message='Please try again' />
			)}

			{!isLoadingMore && (
				<Alert checked severity='info' message='No more comments to show' />
			)}
		</>
	)
}
export default CommentList
