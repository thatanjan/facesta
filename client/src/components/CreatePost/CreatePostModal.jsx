import React, { useState } from 'react'
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
import ImageIcon from '@material-ui/icons/Image'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import GifIcon from '@material-ui/icons/Gif'
import MovieIcon from '@material-ui/icons/Movie'

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
	},
	paper: {
		// backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		border: 'none',
		minWidth: '20rem',
		width: '30vw',
	},
	textFieldStyle: {},
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
}))

const mediaType = [image, gif, video]

const CreatePostModal = ({ isClicked, setIsClicked }) => {
	const {
		modal,
		paper,
		uploadInput,
		textFieldStyle,
		dividerStyle,
		addToPostGrid,
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
						<Typography className={dividerStyle} align='center' variant='h4'>
							Create Post{' '}
						</Typography>
						<Divider variant='middle' className={dividerStyle} />
						<TextField
							className={textFieldStyle}
							id='filled-multiline-static'
							label='Write Your Feelings'
							fullWidth
							multiline
							rows={4}
							variant='filled'
							color='secondary'
						/>

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

							{/* <Grid container item> */}
							{mediaType.map(({ accept, id, Component, name }, index) => (
								<Grid item>
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
							{/* </Grid> */}
						</Grid>

						<PrivacyMenu />
					</Paper>
				</Fade>
			</Modal>
		</>
	)
}

export default CreatePostModal
