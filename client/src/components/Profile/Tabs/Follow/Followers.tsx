import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ReactInfiniteScroll from 'react-infinite-scroll-component'
import { nanoid } from 'nanoid'

import {  User } from 'interfaces/user'
import MuiLink from 'components/Links/MuiLink'
import { cloudinaryURL, FOLLOWEES, FOLLOWERS } from 'variables/global'

import CircularLoader from 'components/Loaders/CircularLoader'

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'), {
	loading: () => <CircularLoader />,
})

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		maxWidth: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: theme.palette.background.paper,

		'& > a': {
			flexGrow: 1,
			[theme.breakpoints.up('sm')]: {
				flexBasis: '50%',
			},
		},
	},
}))

interface Props {
	name: string
	hook: Function
	hasSeenBefore: boolean
	setHasSeenBefore: (val: boolean) => void
}

export const FollowComponent = ({
	name,
	hook,
	hasSeenBefore,
	setHasSeenBefore,
}: Props) => {
	const { data, error, size, setSize, mutate } = hook()
	console.log(error)
	const { root } = useStyles()

	useEffect(() => {
		if (!hasSeenBefore) {
			console.log('first ran')
			setHasSeenBefore(true)
		}

		if (hasSeenBefore) {
			console.log('ran')
			mutate()
		}
	}, [])

	useEffect(() => {
		return () => {
			console.log(name)
		}
	}, [])

	if (error) return <SwrErrorAlert />

	if (!data) return <CircularLoader />

	let isLoadingMore = true

	let users: User[] = []

	if (data) {
		if (data[size - 1]) {
			if (data[size - 1].getFollowers?.followers.length === 0) {
				isLoadingMore = false
			}
		}

		data.forEach((element: { getFollowers: { followers: User[] } }) => {
			users = [...users, ...element.getFollowers.followers]
		})
	}

	return (
		<>
			<List
				className={root}
				component={ReactInfiniteScroll}
				dataLength={users.length}
				next={() => setSize(size + 1)}
				hasMore={isLoadingMore as boolean}
				loader={<h4>Loading...</h4>}
			>
				{Array.isArray(users) &&
					users.map(({ _id, profile: { name: userName, profilePicture } }: User) => (
						<MuiLink
							MuiComponent={ListItem}
							button
							key={nanoid()}
							href={`/profile/${_id}`}
						>
							<ListItemAvatar>
								<Avatar
									alt={userName}
									src={profilePicture && cloudinaryURL(profilePicture)}
								/>
							</ListItemAvatar>

							<ListItemText primary={userName} />
						</MuiLink>
					))}
			</List>
		</>
	)
}

export default FollowComponent
