import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { nanoid } from 'nanoid'
import InfiniteScroll from 'react-infinite-scroll-component'

import { PostUser as User } from 'interfaces/post'
import { useProfileUserID } from 'hooks/profileContextHooks'
import MuiLink from 'components/Links/MuiLink'
import { FOLLOWEES, FOLLOWERS } from 'variables/global'
import { cloudinaryURL } from 'variables/global'

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

export const FollowComponent = ({ name, hook }: Props) => {
	const profileUserId = useProfileUserID()
	const { data, error, setSize, size } = hook()
	const { root } = useStyles()

	if (error) {
		// eslint-disable-next-line
		console.log(error)
		return <div> error </div>
	}

	if (!data) return <div> loading </div>

	console.log(data)

	let isLoadingMore = true

	let users: User[] = []

	if (data) {
		switch (name) {
			case FOLLOWEES:
				if (data[size - 1]) {
					if (data[size - 1].getFollowees?.followees.length === 0) {
						isLoadingMore = false
					}
				}

				data.forEach(element => {
					users = [...users, ...element.getFollowees.followees]
				})

				users = data.getFollowees?.followees
				break

			case FOLLOWERS:
				if (data[size - 1]) {
					if (data[size - 1].getFollowers?.followers.length === 0) {
						isLoadingMore = false
					}
				}

				data.forEach(element => {
					users = [...users, ...element.getFollowers.followers]
				})

				users = data.getFollowers?.followers
				break

			default:
				users = []
		}
	}

	const avatar =
		'https://www.thehairpin.com/wp-content/uploads/2010/12/0SjOFPkAOxl_4Yy2l.jpg'

	return (
		<>
			<List className={root}>
				{Array.isArray(users) &&
					users.map(({ name: userName, _id, profile: { profilePicture } }: User) => (
						<MuiLink
							MuiComponent={ListItem}
							button
							key={nanoid()}
							href={`/profile/${_id}`}
						>
							<ListItemAvatar>
								<Avatar alt={userName} src={cloudinaryURL(profilePicture)} />
							</ListItemAvatar>

							<ListItemText primary={userName} />
						</MuiLink>
					))}
			</List>
		</>
	)
}

export default FollowComponent
