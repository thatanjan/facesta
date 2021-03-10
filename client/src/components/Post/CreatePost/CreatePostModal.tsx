import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ImageIcon from '@material-ui/icons/Image'
import GifIcon from '@material-ui/icons/Gif'
import MovieIcon from '@material-ui/icons/Movie'
import { nanoid } from 'nanoid'

import { createPost } from 'graphql/mutations/postMutations'
import createRequest from 'utils/createRequest'

import PrivacyMenu from './PrivacyMenu'
import TextFieldComponent from './PostTextField'

class MediaTypeBuilder {
	accept: string

	id: string

	Component: Function

	name: string

	constructor(accept: string, id: string, component: Function, name: string) {
		this.accept = accept
		this.id = id
		this.Component = component
		this.name = name
	}
}

const image: MediaTypeBuilder = new MediaTypeBuilder(
	'image/*',
	'pick-image',
	ImageIcon,
	'image'
)
const gif: MediaTypeBuilder = new MediaTypeBuilder(
	'*.gif',
	'pick-gif',
	GifIcon,
	'gif'
)
const video: MediaTypeBuilder = new MediaTypeBuilder(
	'video/*',
	'pick-video',
	MovieIcon,
	'video'
)

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

	addToPostGrid: {
		padding: '1rem',
		border: '1px solid',
		borderRadius: theme.shape.borderRadius,
	},

	addToPostText: {},
	uploadInput: {
		display: 'none',
	},
	headerStyle: {
		[theme.breakpoints.down('xs')]: {
			fontSize: theme.typography.h5.fontSize,
		},
	},
}))

const mediaType = [image, gif, video]

interface Props {
	isClicked: boolean
	setIsClicked: Function
}

const CreatePostModal = ({ isClicked, setIsClicked }: Props) => {
	const [inputText, setInputText] = useState('')

	const modalProps = { inputText, setInputText }

	const {
		modal,
		paper,
		uploadInput,
		dividerStyle,
		addToPostGrid,
		headerStyle,
	} = useStyles()

	const handleClose = () => {
		setIsClicked(false)
	}

	const handleSubmit = (text: string) => {
		createRequest({ key: createPost, values: { text } })

		setTimeout(() => {
			setIsClicked(false)
		}, 2000)
	}

	return (
		<>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={modal}
				open={isClicked}
				onClose={handleClose}
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

						<TextFieldComponent {...modalProps} />

						<Divider variant='middle' className={dividerStyle} />

						<Grid
							container
							alignItems='center'
							justify='space-evenly'
							className={addToPostGrid}
						>
							<Grid item>
								<Typography variant='button'>Add to post</Typography>
							</Grid>

							{mediaType.map(({ accept, id, Component, name }: any) => (
								<Grid item key={nanoid()}>
									<input
										className={uploadInput}
										id={id}
										accept={accept}
										name={name}
										type='file'
									/>

									<IconButton>
										<Component />
									</IconButton>
								</Grid>
							))}
						</Grid>

						<Grid container alignItems='flex-end' justify='space-between'>
							<Grid item>
								<PrivacyMenu />
							</Grid>
							<Grid item>
								<Button
									variant='contained'
									color='secondary'
									onClick={() => handleSubmit(inputText)}
								>
									Submit
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
