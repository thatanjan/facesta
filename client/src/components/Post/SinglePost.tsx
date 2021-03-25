import React, { useState, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CommentIcon from '@material-ui/icons/Comment'
import Image from 'next/image'

import MuiLink from 'components/Links/MuiLink'
import PostType from 'interfaces/post'
import { useHasLiked } from 'hooks/likeHooks'
import createRequest from 'utils/createRequest'
import { likePost, removeLikePost } from 'graphql/mutations/postMutations'

const DropDownMenu = dynamic(
	() => import('components/DropDownMenu/DropDownMenu')
)

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

interface LoveProps {
	postUserID: string
	postID: string
}

const LovePost = ({ postUserID, postID }: LoveProps) => {
	const [isLoved, setIsLoved] = useState(false)
	const { loveStyle } = useStyles()

	const { data: hasLikedData, error, mutate } = useHasLiked({
		postID,
		user: postUserID,
	})

	const hasLiked = hasLikedData?.hasLiked

	useEffect(() => {
		if (hasLiked) {
			setIsLoved(hasLiked)
		}
	}, [hasLiked])

	const clickHandeler = async () => {
		setIsLoved(!isLoved)
		const key = hasLiked ? removeLikePost : likePost
		const values = { postID, user: postUserID }

		const response = await createRequest({ key, values })

		if (response) {
			mutate()
		}
		console.log(response)
	}

	const style = clsx(isLoved && loveStyle)
	return (
		<IconButton aria-label='love' onClick={clickHandeler}>
			<FavoriteIcon className={style} />
		</IconButton>
	)
}

const SinglePost = ({
	headline,
	image,
	text,
	_id: postID,
	user: { _id: postUserID },
}: PostType) => {
	const visibleTextLength = 500
	const { root, media, expand, expandOpen, cardHeaderStyle } = useStyles()

	const moreOptions = ['save', 'Report']

	const [expanded, setExpanded] = React.useState(false)

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	const partOfText = text.substr(0, visibleTextLength)

	const showMoreLink = `/post/${postUserID}/${postID}`

	const loveProps = { postID, postUserID }

	return (
		<Card className={root} raised>
			<CardHeader
				className={cardHeaderStyle}
				action={
					<>
						<DropDownMenu
							aria-controls='fade-menu'
							aria-haspopup='true'
							options={moreOptions}
							IconComponent={MoreVertIcon}
						/>
					</>
				}
				title={headline}
				subheader='September 14, 2016'
			/>
			<Image
				src={image}
				className={media}
				layout='responsive'
				height={720}
				width={1280}
				objectFit='cover'
			/>
			<CardContent>
				<Typography variant='body2' color='textSecondary' component='p'>
					{partOfText}
					{text.length >= visibleTextLength ? (
						<>
							<span>...</span>
							<MuiLink href={showMoreLink} MuiComponent={Typography} variant='button'>
								show more
							</MuiLink>
						</>
					) : null}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<LovePost {...loveProps} />
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

export default SinglePost
