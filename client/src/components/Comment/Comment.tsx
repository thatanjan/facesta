import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import Box from '@material-ui/core/Box'
import Slide, { SlideProps } from '@material-ui/core/Slide'

import { Comment } from 'interfaces/post'

import MuiLink from 'components/Links/MuiLink'
import UserAvatar from 'components/Avatars/UserAvatar'

const DeleteComment = dynamic(() => import('./DeleteComment'))

export const Transition = React.forwardRef(function Transition(
	props: SlideProps,
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />
})

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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

export interface CommentActionProps {
	userID: string
	postID: string
	commentID: string
	mutateCommentsList: Function
}

const CommentAction = (props: CommentActionProps) => {
	return (
		<ListItemSecondaryAction>
			<IconButton edge='end'>
				<EditIcon />
			</IconButton>

			<DeleteComment {...props} />
		</ListItemSecondaryAction>
	)
}

interface Props extends Comment {
	mutateCommentsList: Function
}
const SingleComment = ({
	date,
	text,
	user: {
		_id,
		profile: { name, profilePicture },
	},
	_id: commentID,
	mutateCommentsList,
}: Props) => {
	const { listItemStyle, dividerStyle } = useStyles()

	const {
		query: { post: postID },
	} = useRouter()

	return (
		<>
			<ListItem alignItems='flex-start' className={listItemStyle}>
				<CommentAction
					userID={_id}
					postID={postID as string}
					commentID={commentID}
					mutateCommentsList={mutateCommentsList}
				/>
				<ListItemAvatar>
					<UserAvatar alt={name} imageID={profilePicture} href={`/profile/${_id}`} />
				</ListItemAvatar>

				<ListItemText
					primaryTypographyProps={{
						variant: 'h6',
					}}
					secondaryTypographyProps={{
						component: Box,
					}}
					primary={
						<MuiLink
							href={`/profile/${_id}`}
							MuiComponent={Typography}
							color='textPrimary'
						>
							{name}
						</MuiLink>
					}
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
			<Divider variant='inset' component='li' className={dividerStyle} />
		</>
	)
}

export default SingleComment
