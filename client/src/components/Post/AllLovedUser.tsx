import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'

import ListContainer from 'components/List/UserListContainer'
import UserList from 'components/List/UserList'

import { PostUser as User } from 'interfaces/post'
import { useGetAllLikes } from 'hooks/likeHooks'

interface Props {
	showUsers: boolean
}

const AllLovedUser = ({ showUsers }: Props) => {
	const {
		query: { post: postID, postUser },
	} = useRouter()

	const { data, error, size, setSize, mutate } = useGetAllLikes({
		postID: postID as string,
		user: postUser as string,
	})

	if (error) return <div> Error Happened </div>

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

	useEffect(() => {
		/* console.log(allLikers) */
		/* mutate() */
		/* mutate(data, false) */
		return () => {
			console.log('ran')

			mutate()
			/* mutate(data, false) */
			/* 	setSize(0) */
		}
	}, [])

	console.log(size)

	return (
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
	)
}

export default AllLovedUser
