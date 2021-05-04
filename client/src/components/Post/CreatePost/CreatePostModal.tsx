import React from 'react'
import dynamic from 'next/dynamic'
import { Formik, Form, Field } from 'formik'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import DialogActions from '@material-ui/core/DialogActions'
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
	modal: {
		display: 'grid',
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

export interface Values {
	postHeader: string
	postText: string
}

export const POST_TEXT = 'postText'
export const POST_HEADER = 'postHeader'

const CreatePostModal = () => {
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

	const { postModal, previewLink } = useAppSelector(state => state.createPost)
	const dispatch = useAppDispatch()

	const {
		modal,
		paper,
		dividerStyle,
		headerStyle,
		titleStyle,
		postImageStyle,
	} = useStyles()

	const postHeader: string = Cookies.get(POST_HEADER) || ''
	const postText: string = Cookies.get(POST_TEXT) || ''

	return (
		<>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={modal}
				open={postModal}
				onClose={resetState}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={postModal}>
					<Paper className={paper}>
						<Formik
							initialValues={{
								postHeader,
								postText,
							}}
							validate={(values: Values) => {
								const errors: Partial<Values> = {}

								const header = values[POST_HEADER]
								const text = values[POST_TEXT]

								if (!header) {
									errors.postHeader = 'Required' as ''
								}

								if (!text) {
									errors.postText = 'Required' as ''
								}

								return errors
							}}
							onSubmit={values => {
								dispatch(uploadPost(values))
							}}
						>
							{({ submitForm, isSubmitting }) => (
								<Form>
									<Typography className={headerStyle} align='center' variant='h4'>
										Create Post{' '}
									</Typography>
									<Divider variant='middle' className={dividerStyle} />

									<CardMedia
										image={
											previewLink || cloudinaryURL('confession/post/Please_add_a_picture')
										}
										className={postImageStyle}
									/>
									<UploadImage />

									<Divider variant='middle' className={dividerStyle} />

									<Field
										component={AutoExpandField}
										name={POST_HEADER}
										className={titleStyle}
									/>
									<Field component={AutoExpandField} name={POST_TEXT} />
									<br />

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
											onClick={resetState}
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
					</Paper>
				</Fade>
			</Modal>
		</>
	)
}

export default CreatePostModal
