import React from 'react'

import CreatePostComponent from 'components/CreatePost/CreatePost'
import SinglePost from 'components/Post/SinglePost'

const HomepageComponent = () => {
	return (
		<>
			<CreatePostComponent />
			<SinglePost />
			<SinglePost />
			<SinglePost />
			<SinglePost />
			<SinglePost />
			<SinglePost />
		</>
	)
}

export default HomepageComponent
