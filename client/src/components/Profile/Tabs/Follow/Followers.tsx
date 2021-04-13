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
import { SWRInfiniteResponseInterface } from 'swr'

import { User } from 'interfaces/user'
import MuiLink from 'components/Links/MuiLink'
import { cloudinaryURL } from 'variables/global'

import Alert from 'components/Alerts/Alert'
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
	hook: Function
	hasSeenBefore: boolean
	setHasSeenBefore: (val: boolean) => void
}

const QUERY_NAME = 'getFollowers'

const FollowComponent = ({ hook, hasSeenBefore, setHasSeenBefore }: Props) => {
	const {
		data,
		error,
		size,
		setSize,
		mutate,
	}: SWRInfiniteResponseInterface<
		{
			getFollowers: {
				followers: User[]
				errorMessage: string | null
			}
		},
		any
	> = hook()

	const { root } = useStyles()

	useEffect(() => {
		if (!hasSeenBefore) {
			setHasSeenBefore(true)
		}

		if (hasSeenBefore) {
			mutate()
		}
	}, [])

	if (error) return <SwrErrorAlert />

	if (!data) return <CircularLoader />

	let isLoadingMore = true

	let users: User[] = []

	let errorFromServer = false

	try {
		const lastResponse = data[size - 1]

		if (lastResponse && lastResponse[QUERY_NAME]) {
			const { errorMessage } = lastResponse[QUERY_NAME]

			if (errorMessage) {
				errorFromServer = true
			}

			const { followers } = lastResponse[QUERY_NAME]

			if (
				Array.isArray(followers) &&
				(followers.length === 0 || followers.length < 10)
			) {
				isLoadingMore = false
			}
		}

		data.forEach(element => {
			users = [...element.getFollowers.followers]
		})

		if (users.length === 0)
			return <Alert checked severity='info' message='You have no followers' />
	} catch (_) {
		return <Alert checked severity='error' message='Please try again' />
	}

	return (
		<>
			<List
				className={root}
				component={ReactInfiniteScroll}
				dataLength={users.length}
				next={() => setSize(size + 1)}
				hasMore={isLoadingMore as boolean}
				loader={<CircularLoader />}
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

			{error ||
				(errorFromServer && (
					<Alert checked severity='error' message='Please try again' />
				))}

			{!isLoadingMore && (
				<Alert checked severity='info' message='No more followers to show' />
			)}
		</>
	)
}

export default FollowComponent
