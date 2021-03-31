import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Avatar from '@material-ui/core/Avatar/Avatar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { commentPost } from 'graphql/mutations/postMutations'
import { cloudinaryURL } from 'variables/global'
import CommentList from 'components/Comment/CommentList'
import { useGetSinglePost } from 'hooks/useGetPost'
import { useProfileInfo } from 'hooks/useGetProfileData'
import { useOwnUserId } from 'hooks/userhooks'
import Post from 'interfaces/post'
import createRequest from 'utils/createRequest'
import CommentTextField from './CreatePost/PostTextField'
import SinglePost from './SinglePost'

const useStyles = makeStyles({
	buttonStyle: { margin: '2% 0' },
})

const SinglePostPage = () => {
	const { buttonStyle } = useStyles()

	const ownUserID = useOwnUserId()
	const [inputText, setInputText] = useState('')
	const {
		query: { post: postID, postUser },
	} = useRouter()

	const { data, error } = useGetSinglePost({
		user: postUser as string,
		postID: postID as string,
	})

	const {
		data: profilePictureData,
		error: profilePictureError,
	} = useProfileInfo(ownUserID)

	if (error || profilePictureError) return <div>failed to load</div>
	if (!data || !profilePictureData) return <div>loading...</div>

	const commentListProps = {
		postID: postID as string,
		postUserID: postUser as string,
	}

	const {
		getSinglePost: { post },
	} = data

	const {
		getUser: {
			name,
			profile: { profilePicture },
		},
	} = profilePictureData

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		console.log('ran')
		const values = { text: inputText, postID, user: ownUserID }
		const res = await createRequest({ key: commentPost, values })
		console.log(res)
	}

	return (
		<>
			<SinglePost {...(post as Post)} postPage />
			<Grid container component='form'>
				<Grid item xs={1} alignItems='center'>
					<Avatar alt={name} src={cloudinaryURL(profilePicture)} />
				</Grid>
				<Grid item xs={11}>
					<CommentTextField
						{...{ cookieName: 'comment', inputText, setInputText }}
					/>
				</Grid>
				<Grid item container xs={11} justify='flex-end' className={buttonStyle}>
					<Grid item>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							onSubmit={handleSubmit}
						>
							comment
						</Button>
					</Grid>
				</Grid>
			</Grid>

			<CommentList {...commentListProps} />
		</>
	)
}

export default SinglePostPage
