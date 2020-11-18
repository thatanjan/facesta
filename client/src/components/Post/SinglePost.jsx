import React, { Suspense, lazy, useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CommentIcon from '@material-ui/icons/Comment'

const DropDownMenu = lazy(() => import('components/DropDownMenu/DropDownMenu'))

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: '100%',
		marginTop: theme.spacing(4),
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
	loveStyle: {
		fill: '#ea0000',
	},
	cardHeaderStyle: {
		[theme.breakpoints.down('md')]: {
			'& > .MuiCardHeader-title': {
				backgroundColor: 'red',
				fontSize: '1.3rem',
			},
		},
	},
}))

const LovePost = () => {
	const [isLoved, setIsLoved] = useState(false)

	const { loveStyle } = useStyles()

	const style = clsx(isLoved && loveStyle)
	return (
		<IconButton aria-label='love' onClick={() => setIsLoved(!isLoved)}>
			<FavoriteIcon className={style} />
		</IconButton>
	)
}

const SinglePost = () => {
	const { root, media, expand, expandOpen, cardHeaderStyle } = useStyles()

	const moreOptions = ['save', 'Report']

	const [expanded, setExpanded] = React.useState(false)

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	return (
		<Card className={root} raised>
			<CardHeader
				className={cardHeaderStyle}
				action={
					<Suspense fallback={<div children='cuk' />}>
						<DropDownMenu
							aria-controls='fade-menu'
							aria-haspopup='true'
							options={moreOptions}
							IconComponent={MoreVertIcon}
						/>
					</Suspense>
				}
				title='Anjan'
				subheader='September 14, 2016'
			/>
			<CardMedia
				className={media}
				image='https://images.hdqwalls.com/wallpapers/powergirl-4k-95.jpg'
				title='Paella dish'
			/>
			<CardContent>
				<Typography variant='body2' color='textSecondary' component='p'>
					This is a single post
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<LovePost />
				<IconButton aria-label='comment'>
					<CommentIcon />
				</IconButton>
				<IconButton aria-label='share'>
					<ShareIcon />
				</IconButton>
				<IconButton
					className={clsx(expand, {
						[expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label='show more'
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					<Typography paragraph>Hello world</Typography>
				</CardContent>
			</Collapse>
		</Card>
	)
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost)
