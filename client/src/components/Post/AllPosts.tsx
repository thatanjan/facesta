import React, { UIEvent } from 'react'
import { nanoid } from 'nanoid'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

import Post from 'interfaces/post'
import SinglePost from 'components/Post/SinglePost'
import { useGetNewsFeedPost } from 'hooks/useGetPost'

const useStyles = makeStyles({
	postContainerStyle: {
		maxHeight: '100vh',
		overflowY: 'scroll',
		'-ms-overflow-style': 'none',
		scrollbarWidth: 'none',

		'& ::-webkit-scrollbar': {
			display: 'none',
		},
	},
})

const PostsSection = () => {
	const { postContainerStyle } = useStyles()
	const { data, error, setSize, size } = useGetNewsFeedPost()

	const handleScroll = (event: UIEvent) => {
		/* console.log(event) */
		const {
			target: { scrollHeight, clientHeight, scrollTop },
		} = event

		if (scrollHeight - scrollTop === clientHeight) {
			setSize(size + 1)
		}
	}

	let allPost: Post[] = []

	if (data) {
		data.forEach(element => {
			allPost = [...allPost, ...element.getNewsFeedPost.posts]
		})
	}

	return (
		<>
			<button
				type='button'
				onClick={() => {
					setSize(size + 1)
				}}
			>
				add
			</button>

			<Box onScroll={handleScroll} className={postContainerStyle}>
				{allPost.map((post: Post) => (
					<SinglePost key={nanoid()} {...post} postPage={false} />
				))}
			</Box>

			{error && 'error happened'}
		</>
	)
}

export default PostsSection
