import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ImageIcon from '@material-ui/icons/Image'
import GifIcon from '@material-ui/icons/Gif'
import MovieIcon from '@material-ui/icons/Movie'
import { nanoid } from 'nanoid'

import PrivacyMenu from './PrivacyMenu'

class MediaTypeBuilder {
	constructor(accept, id, component, name) {
		this.accept = accept
		this.id = id
		this.Component = component
		this.name = name
	}
}

const image = new MediaTypeBuilder('image/*', 'pick-image', ImageIcon, 'image')
const gif = new MediaTypeBuilder('*.gif', 'pick-gif', GifIcon, 'gif')
const video = new MediaTypeBuilder('video/*', 'pick-video', MovieIcon, 'video')

// const photoCamera = new MediaTypeBuilder('')

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		overflowY: 'scroll',
	},
	paper: {
		// backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		border: 'none',
		maxWidth: '40rem',
		width: '80vw',
		[theme.breakpoints.down('xs')]: {
			minWidth: '15rem',
		},
	},
	textFieldStyle: {
		'& > label': {
			[theme.breakpoints.down('xs')]: {
				fontSize: theme.typography.body2.fontSize,
			},
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

const TextFieldComponent = () => {
	const { textFieldStyle } = useStyles()

	const [inputText, setInputText] = useState('')

	const getScrollHeight = elm => {
		const element = elm

		const savedValue = elm.value
		element.value = ''
		element.baseScrollHeight = elm.scrollHeight
		element.value = savedValue
	}

	// const inputChangeHandler = ({target}) => console.log(target)

	const inputChangeHandler = ({ target }) => {
		const targetElement = target

		setInputText(targetElement.value)
		// make sure the input event originated from a textarea and it's desired to be auto-expandable
		if (
			!targetElement.classList.contains('autoExpand') ||
			!targetElement.nodeName === 'TEXTAREA'
		)
			return

		const minRows = targetElement.getAttribute('data-min-rows') || 0
		let rows = !targetElement.baseScrollHeight && getScrollHeight(targetElement)

		targetElement.rows = minRows
		rows = Math.ceil(
			(targetElement.scrollHeight - targetElement.baseScrollHeight) / 16
		)
		targetElement.rows = minRows + rows
	}
	return (
		<TextField
			className={textFieldStyle}
			id='filled-multiline-static'
			label='Write Your Feelings'
			fullWidth
			multiline
			variant='filled'
			color='secondary'
			value={inputText}
			inputProps={{
				onChange: inputChangeHandler,
				className: 'autoExpand',
				rows: '3',
				dataminrows: '3',
			}}
		/>
	)
}

const CreatePostModal = ({ isClicked, setIsClicked }) => {
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

						{/* <TextareaAutosize aria-label='empty textarea' placeholder='Empty' /> */}

						<TextFieldComponent />

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

							{mediaType.map(({ accept, id, Component, name }) => (
								<Grid item key={nanoid()}>
									<input
										className={uploadInput}
										id={id}
										accept={accept}
										name={name}
										type='file'
									/>
									<label htmlFor={id}>
										<IconButton>
											<Component />
										</IconButton>
									</label>
								</Grid>
							))}
						</Grid>

						<Grid container alignItems='flex-end' justify='space-between'>
							<Grid item>
								<PrivacyMenu />
							</Grid>
							<Grid item>
								<Button variant='contained' color='secondary'>
									Submit{' '}
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Fade>
			</Modal>
		</>
	)
}

CreatePostModal.propTypes = {
	isClicked: PropTypes.bool.isRequired,
	setIsClicked: PropTypes.func.isRequired,
}

export default CreatePostModal
