import produce from 'immer'
import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { responseInterface } from 'swr'
import Button from '@material-ui/core/Button'

import CircularLoader from 'components/Loaders/CircularLoader'
import { useGetRecommendedToFollow } from 'hooks/followHooks'
import { User } from 'interfaces/user'

import { useUserID } from 'redux/hooks/stateHooks'

const ListContainer = dynamic(
	() => import('components/List/UserListContainer'),
	{ loading: () => <CircularLoader /> }
)

const UserList = dynamic(() => import('components/List/UserList'), {
	loading: () => <CircularLoader />,
})

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

const RightNavigation = () => {
	const { push } = useRouter()

	const {
		data,
		error,
	}: responseInterface<
		{ getRecommendedToFollow: { users: User[] } },
		any
	> = useGetRecommendedToFollow()

	const ownUserID = useUserID()

	if (!data) return <CircularLoader />
	if (error) return <SwrErrorAlert />

	const {
		getRecommendedToFollow: { users },
	} = data

	const newUsers = produce(users, draft => {
		const index = draft.findIndex(user => user._id === ownUserID)
		if (index !== -1) draft.splice(index, 1)
	})

	return (
		<ListContainer listSubheader='People who you would like to follow'>
			<UserList users={newUsers} />

			{users.length >= 10 && (
				<Button
					variant='text'
					color='secondary'
					size='small'
					fullWidth
					style={{
						width: '80%',
						margin: '0 auto',
					}}
					onClick={() => push('/development')}
				>
					See more
				</Button>
			)}
		</ListContainer>
	)
}

export default RightNavigation
