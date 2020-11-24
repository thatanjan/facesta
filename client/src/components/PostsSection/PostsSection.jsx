import React from 'react'
import { connect } from 'react-redux'

import SinglePost from 'components/Post/SinglePost'

const PostsSection = () => {
	return (
		<div>
			<SinglePost />
			<SinglePost />
			<SinglePost />
		</div>
	)
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(PostsSection)
