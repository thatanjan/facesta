import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { nanoid } from 'nanoid'

import { useProfileUserID } from 'hooks/profileContextHooks'
import MuiLink from 'components/Links/MuiLink'
import { FOLLOWEES, FOLLOWERS } from 'variables/global'

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

interface Props {
	name: string
	hook: Function
}

interface Users {
	name: string
	// eslint-disable-next-line react/no-unused-prop-types
	id: string
}

export const FollowComponent = ({ name, hook }: Props) => {
	const profileUserId = useProfileUserID()
	const { data, error } = hook(10)
	const { root } = useStyles()

	if (error) {
		// eslint-disable-next-line
		console.log(error)
		return <div> error </div>
	}

	if (!data) return <div> loading </div>

	console.log(data)

	let users: Users[]

	switch (name) {
		case FOLLOWEES:
			users = data.getFollowees.followees

			break

		case FOLLOWERS:
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
				{users.map(({ name: userName, id }: Users) => (
					<MuiLink
						MuiComponent={ListItem}
						button
						key={nanoid()}
						href={`/profile/${id}`}
					>
						<ListItemAvatar>
							<Avatar src={avatar} />
						</ListItemAvatar>

						<ListItemText primary={userName} />
					</MuiLink>
				))}
			</List>
		</>
	)
}

export default FollowComponent
