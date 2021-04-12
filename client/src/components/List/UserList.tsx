import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { nanoid } from 'nanoid'

import { cloudinaryURL } from 'variables/global'
import MuiLink from 'components/Links/MuiLink'
import {  User } from 'interfaces/user'

interface Props {
	users: Array<User>
}

const UserList = ({ users }: Props) => {
	return (
		<>
			{users.map(({ _id, profile: { name, profilePicture } }) => (
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
		</>
	)
}

export default UserList
