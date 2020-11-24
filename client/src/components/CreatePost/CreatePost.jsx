import React, { Suspense, lazy, useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Input from '@material-ui/core/Input'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import LiveTvIcon from '@material-ui/icons/LiveTv'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import ImageIcon from '@material-ui/icons/Image'
import CircularProgress from '@material-ui/core/CircularProgress'

const CreatePostModal = lazy(() => import('./CreatePostModal'))

const useStyles = makeStyles({
	inputGridItem: {
		flexGrow: 1,
	},
	inputStyle: {
		cursor: 'pointer',
		width: '100%',
		'&&&:before': {
			borderBottom: 'none',
		},
		'&&:after': {
			borderBottom: 'none',
		},
	},
	buttonGroupStyle: {
		marginTop: '1rem',
		justifyContent: 'space-evenly',
	},
})

export const CreatePost = () => {
	const { inputStyle, inputGridItem, buttonGroupStyle } = useStyles()

	const [isClicked, setIsClicked] = useState(false)

	const inputClickHandler = () => {
		setIsClicked(!isClicked)
	}

	return (
		<>
			<Card>
				<CardContent>
					<Grid container>
						<Grid item>
							<IconButton edge='start'>
								<AccountCircleIcon />
							</IconButton>
						</Grid>
						<Grid item className={inputGridItem}>
							<Input
								placeholder='write your feelings'
								className={inputStyle}
								onClick={inputClickHandler}
							/>
						</Grid>
						{isClicked && (
							<Suspense fallback={<CircularProgress />}>
								{' '}
								<CreatePostModal
									isClicked={isClicked}
									setIsClicked={setIsClicked}
								/>{' '}
							</Suspense>
						)}
					</Grid>
					<Divider />

					<CardActions className={buttonGroupStyle}>
						<Button fullWidth variant='text' startIcon={<LiveTvIcon />}>
							Go Live
						</Button>
						<Button fullWidth variant='text' startIcon={<ImageIcon />}>
							Share Image
						</Button>
						<Button fullWidth variant='text' startIcon={<EmojiEmotionsIcon />}>
							Feelings
						</Button>
					</CardActions>
				</CardContent>
			</Card>
		</>
	)
}

const mapDispatchToProps = {}

const createPostComponent = connect(null, mapDispatchToProps)(CreatePost)

export default createPostComponent
