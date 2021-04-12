import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'

import {  User } from 'interfaces/user'
import { useGetAllLikes } from 'hooks/likeHooks'

import CircularLoader from 'components/Loaders/CircularLoader'

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
}

const AllLovedUser = ({ showUsers, setShowUsers, title }: Props) => {
	const {
		query: { post: postID, postUser },
	} = useRouter()

	const { data, error, size, setSize, mutate } = useGetAllLikes({
		postID: postID as string,
		user: postUser as string,
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

	let allLikers: User[] = []

	if (data) {
		if (data[size - 1]) {
			if (data[size - 1].getAllLikes?.users.length === 0) {
				isLoadingMore = false
			}
		}

		data.forEach(element => {
			allLikers = [...allLikers, ...element.getAllLikes.users]
		})
	}

	return (
		<UserListModal {...{ showUsers, setShowUsers, title, mutate }}>
			<ListContainer>
				<InfiniteScroll
					dataLength={allLikers.length}
					next={() => setSize(size + 1)}
					hasMore={isLoadingMore}
					loader={<h4>Loading...</h4>}
				>
					<UserList users={allLikers} />
				</InfiniteScroll>
			</ListContainer>
		</UserListModal>
	)
}

export default AllLovedUser
