import React from 'react'
import dynamic from 'next/dynamic'
import { Formik, Form, Field } from 'formik'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Cookies from 'js-cookie'

import { useAppSelector, useAppDispatch } from 'redux/hooks/hooks'
import { uploadPost, resetState } from 'redux/slices/createPost'

import CircularLoader from 'components/Loaders/CircularLoader'

import { cloudinaryURL } from 'variables/global'

import UploadImage from 'components/Upload/PostImageUpload'

const AutoExpandField = dynamic(
	() => import('components/TextFields/AutoExpandField'),
	{ loading: () => <CircularLoader /> }
)

const useStyles = makeStyles(theme => ({
	dialogContentStyle: {
		overflowX: 'hidden',
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

export interface Values {
	postTitle: string
	postContent: string
}

export const POST_CONTENT = 'postContent'
export const POST_TITLE = 'postTitle'

const CreatePostModal = () => {
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

	const { postModal, previewLink } = useAppSelector(state => state.createPost)
	const dispatch = useAppDispatch()

	const closePostModal = () => {
		dispatch(resetState())
	}

	const {
		headerStyle,
		titleStyle,
		postImageStyle,
		dialogContentStyle,
	} = useStyles()

	const postTitle: string = Cookies.get(POST_TITLE) || ''
	const postContent: string = Cookies.get(POST_CONTENT) || ''

	const fullScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down('xs')
	)
	return (
		<>
			<Dialog
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={postModal}
				onClose={closePostModal}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
				scroll='body'
				maxWidth='sm'
				fullScreen={fullScreen}
				fullWidth
			>
				<Formik
					initialValues={{
						postTitle,
						postContent,
					}}
					validate={(values: Values) => {
						const errors: Partial<Values> = {}

						const title = values[POST_TITLE]
						const content = values[POST_CONTENT]

						const titleLength = title.length
						const contentLength = content.length

						if (!title) {
							errors.postTitle = 'Required' as ''
						}

						if (titleLength > 100)
							errors.postTitle = 'Title should be under 100 characters long'

						if (!content) {
							errors.postContent = 'Required' as ''
						}

						if (contentLength > 5000)
							errors.postTitle = 'Content should be under 5000 characters long'

						return errors
					}}
					onSubmit={values => {
						dispatch(uploadPost(values))
					}}
				>
					{({ submitForm, isSubmitting }) => (
						<Form>
							<DialogTitle disableTypography>
								<Typography className={headerStyle} align='center' variant='h4'>
									Create Post{' '}
								</Typography>
							</DialogTitle>

							<DialogContent className={dialogContentStyle} dividers>
								<CardMedia
									image={
										previewLink || cloudinaryURL('confession/post/Please_add_a_picture')
									}
									className={postImageStyle}
								/>
								<UploadImage />

								<Field
									component={AutoExpandField}
									name={POST_TITLE}
									className={titleStyle}
								/>
								<Field component={AutoExpandField} name={POST_CONTENT} />
							</DialogContent>

							<DialogActions>
								<Button
									size={matches ? 'medium' : 'small'}
									variant='contained'
									color='primary'
									disabled={isSubmitting || !previewLink}
									onClick={submitForm}
								>
									Submit
								</Button>
								<Button
									onClick={closePostModal}
									size={matches ? 'medium' : 'small'}
									variant='contained'
									color='primary'
									disabled={isSubmitting}
								>
									Cancel
								</Button>
							</DialogActions>
						</Form>
					)}
				</Formik>
			</Dialog>
		</>
	)
}

export default CreatePostModal
