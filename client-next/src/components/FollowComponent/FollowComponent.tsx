import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { nanoid } from 'nanoid'

import { useUserId } from 'hooks/profileContextHooks'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		maxWidth: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: theme.palette.background.paper,

		'& > a': {
			[theme.breakpoints.down('xs')]: {
				flexBasis: '100%',
			},
			flexBasis: '50%',
		},
	},
}))

interface Props {
	hook: Function
	name: string
}

interface Users {
	name: string
	id: string
}

export const FollowComponent = ({ hook, name }: Props) => {
	const userId = useUserId()
	const { data, error } = hook(userId)
	const { root } = useStyles()

	if (error) {
		// eslint-disable-next-line
		console.log(error)
		return <div> error </div>
	}

	if (!data) return <div> loading </div>

	let users: Users[]

	switch (name) {
		case 'following':
			users = data.getFollowing.following
			break

		case 'followers':
			users = data.getFollowers.followers
			break

		default:
			users = []
	}

	const avatar =
		'https://www.thehairpin.com/wp-content/uploads/2010/12/0SjOFPkAOxl_4Yy2l.jpg'

	return (
		<>
			<List className={root}>
				{users.map(({ name: userName }: Users) => (
					<ListItem component='li' button key={nanoid()}>
						<ListItemAvatar>
							<Avatar src={avatar} />
						</ListItemAvatar>

						<ListItemText primary={userName} />
					</ListItem>
				))}
			</List>
		</>
	)
}

export default FollowComponent
