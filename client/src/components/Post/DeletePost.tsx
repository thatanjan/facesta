import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide, { SlideProps } from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'

import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import { deletePost } from 'graphql/mutations/postMutations'

import createRequest from 'utils/createRequest'
import { useMutateNewsFeed, useMutateAllPost } from 'redux/hooks/useNewsFeed'

const Transition = React.forwardRef(function Transition(
	props: SlideProps,
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />
})

interface Props {
	postID: string
}

const DeletePost = ({ postID }: Props) => {
	const [showDialog, setShowDialog] = useState(false)

	console.log(useRouter())
	const mutateNewsFeed = useMutateNewsFeed()
	const mutateAllPost = useMutateAllPost()

	const { pathname, push } = useRouter()

	const handleDelete = async () => {
		const {
			deletePost: { message },
		} = await createRequest({
			values: { postID },
			key: deletePost,
		})

		if (message) {
			setShowDialog(false)
			if (pathname === '/') mutateNewsFeed()

			if (pathname === '/profile/[profile]') mutateAllPost()

			if (pathname === '/post/[postUser]/[post]') {
				mutateNewsFeed()
				push('/')
			}
		}
	}

	return (
		<>
			<MenuItem onClick={() => setShowDialog(true)}>
				<ListItemIcon>
					<DeleteForeverIcon />
				</ListItemIcon>
				<ListItemText primary='Delete Post' />
			</MenuItem>

			<Dialog open={showDialog} TransitionComponent={Transition} keepMounted>
				<DialogTitle id='alert-dialog-slide-title'>
					Do you want to Delete the post?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						If you Delete the post, you will never be able to recover this post.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setShowDialog(false)} color='primary'>
						Cancel
					</Button>
					<Button onClick={handleDelete} color='primary'>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default DeletePost
