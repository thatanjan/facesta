import React, { useEffect } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import ReactInfiniteScroll from 'react-infinite-scroll-component'
import { nanoid } from 'nanoid'
import Box from '@material-ui/core/Box'
import dynamic from 'next/dynamic'

import { useGetAllComments, Input as HookInput } from 'hooks/commentHooks'
import { Comment } from 'interfaces/post'

import CircularLoader from 'components/Loaders/CircularLoader'

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			backgroundColor: theme.palette.background.paper,
		},
	})
)

interface Props extends HookInput {
	newCommentAdded: boolean
}

const CommentList = ({ postID, postUserID, newCommentAdded }: Props) => {
	const { root } = useStyles()

	const { data, error, setSize, size, mutate } = useGetAllComments({
		postID,
		postUserID,
	})

	useEffect(() => {
		if (newCommentAdded) {
			mutate()
		}
	}, [newCommentAdded])

	if (!data) return <CircularLoader />
	if (error) return <SwrErrorAlert />

	let isLoadingMore = true
	let allComments: Comment[] = []

	if (data) {
		if (data[size - 1]) {
			if (data[size - 1].getAllComments?.comments.length === 0) {
				isLoadingMore = false
			}
		}

		data.forEach(element => {
			allComments = [...allComments, ...element.getAllComments.comments]
		})
	}

	return (
		<>
			<List
				className={root}
				component={ReactInfiniteScroll}
				dataLength={allComments.length}
				next={() => setSize(size + 1)}
				hasMore={isLoadingMore as boolean}
				loader={<h4>Loading...</h4>}
			>
				{Array.isArray(data) &&
					allComments.map(
						({
							text,
							date,
							user: {
								_id,
								profile: { name, profilePicture },
							},
						}: Comment) => (
							<Box key={nanoid()}>
								<ListItem alignItems='flex-start'>
									<ListItemAvatar>
										<Avatar
											alt={name}
											src={`https://res.cloudinary.com/thatanjan/${profilePicture}`}
										/>
									</ListItemAvatar>

									<ListItemText
										primaryTypographyProps={{
											variant: 'h6',
										}}
										secondaryTypographyProps={{
											component: Box,
										}}
										primary={name}
										secondary={
											<>
												<Typography variant='body2' color='textPrimary'>
													{new Date(date).toDateString()}
												</Typography>
												<Typography variant='subtitle1' color='textPrimary'>
													{text}
												</Typography>
											</>
										}
									/>
								</ListItem>
								<Divider variant='inset' component='li' />
							</Box>
						)
					)}
			</List>
		</>
	)
}
export default CommentList
