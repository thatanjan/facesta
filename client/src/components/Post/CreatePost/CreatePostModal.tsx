import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CardMedia from '@material-ui/core/CardMedia'
import { mutate } from 'swr'

import UploadImage, {
	Props as UploadImageProps,
	Base64,
} from 'components/Upload/ImageUpload'
import { createPost } from 'graphql/mutations/postMutations'
import { getNewsFeedPost } from 'graphql/queries/postQueries'
import createRequest from 'utils/createRequest'
import { useOwnUserId } from 'hooks/userhooks'

import TextFieldComponent from './PostTextField'

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		overflowY: 'scroll',
	},
	paper: {
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		border: 'none',
		maxWidth: '40rem',
		width: '80vw',
		[theme.breakpoints.down('xs')]: {
			minWidth: '15rem',
		},
	},
	dividerStyle: {
		margin: '10px 0px',
	},

	addToPostText: {},
	headerStyle: {
		[theme.breakpoints.down('xs')]: {
			fontSize: theme.typography.h5.fontSize,
		},
	},
	titleStyle: {
		marginBottom: theme.spacing(2),
	},
	postImageStyle: { height: 0, paddingTop: '56.25%' },
}))

interface Props {
	isClicked: boolean
	setIsClicked: Function
}

const CreatePostModal = ({ isClicked, setIsClicked }: Props) => {
	const [inputText, setInputText] = useState('')
	const [title, setTitle] = useState('')
	const [postPreviewLink, setPostPreviewLink] = useState('')
	const [uploadingPost, setUploadingPost] = useState(false)

	const modalProps = { inputText, setInputText }

	const {
		modal,
		paper,
		dividerStyle,
		headerStyle,
		titleStyle,
		postImageStyle,
	} = useStyles()

	const closePostModal = () => {
		setIsClicked(false)
	}

	const handleSubmit = () => {
		setUploadingPost(true)
	}

	const ownUserID = useOwnUserId()

	const action = async (image: Base64) => {
		const values = {
			headline: title,
			text: inputText,
			image,
			markdown: false,
		}

		const res = await createRequest({
			key: createPost,
			values,
		})

		mutate([getNewsFeedPost, ownUserID])
		return res
	}

	const uploadImageProps: UploadImageProps = {
		setPostPreviewLink,
		type: 'createPost',
		uploadingPost,
		setUploadingPost,
		action,
		closePostModal,
	}

	return (
		<>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={modal}
				open={isClicked}
				onClose={closePostModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={isClicked}>
					<Paper className={paper}>
						<Typography className={headerStyle} align='center' variant='h4'>
							Create Post{' '}
						</Typography>
						<Divider variant='middle' className={dividerStyle} />

						<CardMedia
							image={
								postPreviewLink ||
								'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f94558af-be11-4968-be28-085d6e57abd6/dlqc69-0b6b17a2-3b57-47d2-9cba-f5ddc861bcfa.jpg/v1/fill/w_1168,h_849,q_75,strp/cat__s_eye_nebula_by_decorinason.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9mOTQ1NThhZi1iZTExLTQ5NjgtYmUyOC0wODVkNmU1N2FiZDYvZGxxYzY5LTBiNmIxN2EyLTNiNTctNDdkMi05Y2JhLWY1ZGRjODYxYmNmYS5qcGciLCJ3aWR0aCI6Ijw9MTE2OCIsImhlaWdodCI6Ijw9ODQ5In1dXX0.rWHrviSjWBmkcqLRYgMXuLYoh6g1ZSWT1Zi1JdZkkwU'
							}
							className={postImageStyle}
						/>
						<UploadImage {...uploadImageProps} />

						<TextField
							className={titleStyle}
							fullWidth
							id='filled-basic'
							label='Title'
							variant='filled'
							onChange={e => {
								setTitle(e.target.value)
							}}
						/>
						<TextFieldComponent {...modalProps} />

						<Divider variant='middle' className={dividerStyle} />

						<Grid container alignItems='flex-end' justify='space-between'>
							<Grid item>
								<Button variant='contained' color='secondary' onClick={handleSubmit}>
									Submit
								</Button>

								<Button variant='contained' color='secondary' onClick={closePostModal}>
									Cancel
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Fade>
			</Modal>
		</>
	)
}

export default CreatePostModal
