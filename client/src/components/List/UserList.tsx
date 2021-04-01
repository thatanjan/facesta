import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { nanoid } from 'nanoid'

import { cloudinaryURL } from 'variables/global'
import MuiLink from 'components/Links/MuiLink'

interface User {
	name: string
	_id: string
	profile: {
		profilePicture: string
	}
}

interface Props {
	InfiniteScroll: React.ElementType
	users: Array<User>
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		maxWidth: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: theme.palette.background.paper,

		'& > a': {
			flexBasis: '100%',
		},
	},
}))

const UserList = ({ users, InfiniteScroll }: Props) => {
	const { root } = useStyles()

	return (
		<List className={root}>
			<InfiniteScroll>
				{users.map(({ name, _id, profile: { profilePicture } }) => (
					<MuiLink
						MuiComponent={ListItem}
						button
						key={nanoid()}
						href={`/profile/${_id}`}
					>
						<ListItemAvatar>
							<Avatar src={cloudinaryURL(profilePicture)} />
						</ListItemAvatar>

						<ListItemText primary={name} />
					</MuiLink>
				))}
			</InfiniteScroll>
		</List>
	)
}

export default UserList
