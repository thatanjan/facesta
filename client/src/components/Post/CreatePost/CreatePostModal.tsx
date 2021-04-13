import React, { useState, useEffect } from 'react'
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
import { mutate } from 'swr'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Cookies from 'js-cookie'

import CircularLoader from 'components/Loaders/CircularLoader'
import { createPost } from 'graphql/mutations/postMutations'
import { getNewsFeedPost } from 'graphql/queries/postQueries'
import createRequest from 'utils/createRequest'
import { useOwnUserId } from 'hooks/userhooks'

import UploadImage, {
	Props as UploadImageProps,
	Base64,
} from 'components/Upload/PostImageUpload'

import { CustomFile } from 'interfaces/upload'

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

interface Props {
	isClicked: boolean
	setIsClicked: Function
	setShouldMutate: (bool: boolean) => void
}

interface Values {
	postHeader: string
	postText: string
}

interface Inputs {
	headline: string
	text: string
	image: string
	markdown: boolean
}

export const POST_TEXT = 'postText'
export const POST_HEADER = 'postHeader'

const CreatePostModal = ({
	isClicked,
	setIsClicked,
	setShouldMutate,
}: Props) => {
	const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
	const [postPreviewLink, setPostPreviewLink] = useState('')
	const [uploadingPost, setUploadingPost] = useState(false)
	const [inputs, setInputs] = useState<Inputs | {}>({})
	const [goingToSubmit, setGoingToSubmit] = useState(false)
	const [file, setFile] = useState<CustomFile | {}>({})

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
			...inputs,
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
		uploadingPost,
		setUploadingPost,
		action,
		closePostModal,
		setShouldMutate,
		file,
		setFile,
	}

	const postHeader: string = Cookies.get(POST_HEADER) || ''
	const postText: string = Cookies.get(POST_TEXT) || ''

	useEffect(() => {
		if (goingToSubmit) {
			handleSubmit()
		}
		setGoingToSubmit(false)
	}, [goingToSubmit])

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
								setInputs(prev => ({
									...prev,
									text: values.postText,
									headline: values.postHeader,
								}))

								setGoingToSubmit(true)
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
											postPreviewLink ||
											'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f94558af-be11-4968-be28-085d6e57abd6/dlqc69-0b6b17a2-3b57-47d2-9cba-f5ddc861bcfa.jpg/v1/fill/w_1168,h_849,q_75,strp/cat__s_eye_nebula_by_decorinason.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9mOTQ1NThhZi1iZTExLTQ5NjgtYmUyOC0wODVkNmU1N2FiZDYvZGxxYzY5LTBiNmIxN2EyLTNiNTctNDdkMi05Y2JhLWY1ZGRjODYxYmNmYS5qcGciLCJ3aWR0aCI6Ijw9MTE2OCIsImhlaWdodCI6Ijw9ODQ5In1dXX0.rWHrviSjWBmkcqLRYgMXuLYoh6g1ZSWT1Zi1JdZkkwU'
										}
										className={postImageStyle}
									/>
									<UploadImage {...uploadImageProps} />

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
											disabled={isSubmitting || Object.keys(file).length === 0}
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
					</Paper>
				</Fade>
			</Modal>
		</>
	)
}

export default CreatePostModal
