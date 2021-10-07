import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Box from '@material-ui/core/Box'

import { Comment } from 'interfaces/post'

import MuiLink from 'components/Links/MuiLink'
import UserAvatar from 'components/Avatars/UserAvatar'

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

const SingleComment = ({
	date,
	text,
	user: {
		_id,
		profile: { name, profilePicture },
	},
}: Comment) => {
	const { listItemStyle, dividerStyle } = useStyles()

	return (
		<>
			<ListItem alignItems='flex-start' className={listItemStyle}>
				<ListItemSecondaryAction>
					<IconButton edge='end' aria-label='delete'>
						<EditIcon />
					</IconButton>

					<IconButton edge='end' aria-label='delete'>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
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
