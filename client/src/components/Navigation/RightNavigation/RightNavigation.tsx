import produce from 'immer'
import React from 'react'
import dynamic from 'next/dynamic'
import { responseInterface } from 'swr'

import CircularLoader from 'components/Loaders/CircularLoader'
import { useGetRecommendedToFollow } from 'hooks/followHooks'
import { useOwnUserId } from 'hooks/userhooks'
import { PostUser as User } from 'interfaces/post'

const ListContainer = dynamic(
	() => import('components/List/UserListContainer'),
	{ loading: () => <CircularLoader /> }
)

const UserList = dynamic(() => import('components/List/UserList'), {
	loading: () => <CircularLoader />,
})

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

const RightNavigation = () => {
	const {
		data,
		error,
	}: responseInterface<
		{ getRecommendedToFollow: { users: User[] } },
		any
	> = useGetRecommendedToFollow()

	const ownUserID = useOwnUserId()

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
		<ListContainer>
			<UserList users={newUsers} />
		</ListContainer>
	)
}

export default RightNavigation
