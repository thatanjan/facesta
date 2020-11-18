import React from 'react'

import Container from '@material-ui/core/Container'
import CreatePost from 'components/CreatePost/CreatePost'
import SinglePost from 'components/Post/SinglePost'

const HomepageComponent = () => {
	return (
		<>
			<CreatePost />
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
