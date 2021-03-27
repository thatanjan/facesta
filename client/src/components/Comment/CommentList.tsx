import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { nanoid } from 'nanoid'

import { useGetAllComments, Input as HookInput } from 'hooks/commentHooks'
import { Comment } from 'interfaces/post'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			backgroundColor: theme.palette.background.paper,
		},
		inline: {
			/* display: 'inline', */
		},
	})
)

const CommentList = ({ postID, postUserID }: HookInput) => {
	const classes = useStyles()

	const { data, error, setSize, size } = useGetAllComments({
		postID,
		postUserID,
	})

	console.log(data)

	let allComments: Comment[] = []

	if (data) {
		data.forEach(element => {
			allComments = [...allComments, ...element.getAllComments.comments]
		})
	}

	return (
		<>
			<List className={classes.root}>
				{Array.isArray(data) &&
					allComments.map(
						({
							text,
							date,
							user: {
								name,
								_id,
								profile: { profilePicture },
							},
						}: Comment) => (
							<>
								<ListItem alignItems='flex-start' key={nanoid()}>
									<ListItemAvatar>
										<Avatar
											alt={name}
											src={`https://res.cloudinary.com/thatanjan/${profilePicture}`}
										/>
									</ListItemAvatar>
								</ListItem>
							</>
						)
					)}
			</List>
		</>
	)
}
export default CommentList
