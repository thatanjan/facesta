import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
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

import { AnyObject } from 'interfaces/global'
import { createPost } from 'graphql/mutations/postMutations'
import createRequest from 'utils/createRequest'

import PrivacyMenu from './PrivacyMenu'

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

interface TextFieldProps {
	inputText: string
	setInputText: Function
}

const TextFieldComponent = ({ inputText, setInputText }: TextFieldProps) => {
	const { textFieldStyle } = useStyles()

	const cookieName = 'post'

	useEffect(() => {
		const cookieValue = Cookies.get(cookieName)
		if (cookieValue) {
			setInputText(cookieValue)
		}
	}, [])

	const getScrollHeight = (elm: any) => {
		const element: any = elm

		const savedValue: string | number = elm.value
		element.value = ''
		element.baseScrollHeight = elm.scrollHeight
		element.value = savedValue
	}

	const inputChangeHandler = ({ target }: AnyObject) => {
		const targetElement: AnyObject = target

		const targetValue = target.value
		const expires = { expires: 1 / 48 }

		Cookies.set(cookieName, targetValue, expires)

		setInputText(targetValue)

		// make sure the input event originated from a textarea and it's desired to be auto-expandable
		if (
			!targetElement.classList.contains('autoExpand') ||
			targetElement.nodeName !== 'TEXTAREA'
		)
			return

		const minRows = targetElement.getAttribute('data-min-rows') || 0
		let rows: number | boolean | void =
			!targetElement.baseScrollHeight && getScrollHeight(targetElement)

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
