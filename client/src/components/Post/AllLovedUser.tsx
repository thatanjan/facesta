import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'

import { User } from 'interfaces/user'
import { useGetAllLikes } from 'hooks/likeHooks'

import CircularLoader from 'components/Loaders/CircularLoader'
import Alert from 'components/Alerts/Alert'

const ListContainer = dynamic(
	() => import('components/List/UserListContainer'),
	{ loading: () => <CircularLoader /> }
)

const UserList = dynamic(() => import('components/List/UserList'), {
	loading: () => <CircularLoader />,
})

const UserListModal = dynamic(() => import('components/Modals/UserListModal'), {
	loading: () => <CircularLoader />,
})

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

interface Props {
	showUsers: boolean
	setShowUsers: (value: boolean) => void
	title: string
	idOfPost?: string
	idOfPostUser?: string
}

const QUERY_NAME = 'getAllLikes'

const AllLovedUser = ({
	idOfPostUser,
	idOfPost,
	showUsers,
	setShowUsers,
	title,
}: Props) => {
	const {
		query: { post: postID, postUser },
	} = useRouter()

	const { data, error, size, setSize, mutate } = useGetAllLikes({
		postID: idOfPost || (postID as string),
		user: idOfPostUser || (postUser as string),
	})

	useEffect(() => {
		mutate()
		return () => {
			mutate(data, false)
		}
	}, [])

	if (error) return <SwrErrorAlert />
	if (!data) return <CircularLoader />

	let isLoadingMore = true

	if (!data)
		return (
			<Alert
				checked
				severity='info'
				message='Please wait we are loading your news feed'
			/>
		)

	let errorFromServer = false

	let allUsers: User[] = []

	try {
		const lastResponse = data[size - 1]

		if (lastResponse && lastResponse[QUERY_NAME]) {
			const { errorMessage } = lastResponse[QUERY_NAME]

			if (errorMessage) {
				errorFromServer = true
			}

			const { users } = lastResponse[QUERY_NAME]

			if (Array.isArray(users) && (users.length === 0 || users.length < 10)) {
				isLoadingMore = false
			}
		}

		data.forEach(element => {
			allUsers = [...allUsers, ...element.getAllLikes.users]
		})
	} catch (_) {
		return <Alert checked severity='error' message='Please try again' />
	}

	return (
		<UserListModal {...{ showUsers, setShowUsers, title, mutate }}>
			{allUsers.length === 0 ? (
				<Alert checked severity='info' message='No one has liked this post yet' />
			) : (
				<ListContainer>
					<InfiniteScroll
						dataLength={allUsers.length}
						next={() => setSize(size + 1)}
						hasMore={isLoadingMore}
						loader={<CircularLoader />}
					>
						<UserList users={allUsers} />
					</InfiniteScroll>
				</ListContainer>
			)}

			{(error || errorFromServer) && (
				<Alert checked severity='error' message='Please try again' />
			)}

			{!isLoadingMore && (
				<Alert checked severity='info' message='No more users to show' />
			)}
		</UserListModal>
	)
}

export default AllLovedUser
