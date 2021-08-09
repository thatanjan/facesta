import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { nanoid } from 'nanoid'

import UserAvatar from 'components/Avatars/UserAvatar'

import { cloudinaryURL } from 'variables/global'
import MuiLink from 'components/Links/MuiLink'
import { User, SearchedUser } from 'interfaces/user'

interface Props {
	users: Array<User | SearchedUser>
	searching?: boolean
}

const UserList = ({ users, searching }: Props) => {
	return (
		<>
			{!searching &&
				users.map(({ _id, profile: { name, profilePicture } }: User) => (
					<MuiLink
						MuiComponent={ListItem}
						button
						key={nanoid()}
						href={`/profile/${_id}`}
					>
						<ListItemAvatar>
							<UserAvatar imageID={profilePicture} href={`/profile/${_id}`} />
						</ListItemAvatar>

						<ListItemText primary={name} />
					</MuiLink>
				))}

			{searching &&
				users.map(({ user, name, profilePicture }: SearchedUser) => (
					<MuiLink
						MuiComponent={ListItem}
						button
						key={nanoid()}
						href={`/profile/${user}`}
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
