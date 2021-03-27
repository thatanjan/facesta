import React from 'react'
import Image from 'next/image'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CommentIcon from '@material-ui/icons/Comment'
import { useRouter } from 'next/router'

import { useGetSinglePost } from 'hooks/useGetPost'
import Post from 'interfaces/post'
import SinglePost from './SinglePost'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			boxShadow: 'none',
		},
	})
)

const SinglePostPage = () => {
	const {
		query: { post: postID, postUser },
	} = useRouter()

	const { data, error } = useGetSinglePost({
		user: postUser as string,
		postID: postID as string,
	})

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const {
		getSinglePost: { post },
	} = data

	return (
		<>
			<SinglePost {...(post as Post)} postPage />
		</>
	)
}

export default SinglePostPage
