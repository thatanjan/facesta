import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
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
	imageHover: {
		cursor: 'pointer',
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
	totalLikes: number
}

export const LovePost = ({ totalLikes, postUserID, postID }: LoveProps) => {
	const [isLoved, setIsLoved] = useState(false)
	const [totalNumberOfLikes, setTotalNumberOfLikes] = useState(0)
	const [sendingRequest, setSendingRequst] = useState(false)
	const { loveStyle } = useStyles()

	const { data: hasLikedData } = useHasLiked({
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
		if (isLoved) {
			setTotalNumberOfLikes(prev => prev - 1)
			setIsLoved(!isLoved)
		} else {
			setTotalNumberOfLikes(prev => prev + 1)
			setIsLoved(!isLoved)
		}

		if (!sendingRequest) {
			setSendingRequst(true)

			const key = hasLiked ? removeLikePost : likePost
			const values = { postID, user: postUserID }

			const response = await createRequest({ key, values })

			if (response) {
				setSendingRequst(false)
			}

			console.log(response)
		}
	}

	useEffect(() => {
		setTotalNumberOfLikes(totalLikes)
		setIsLoved(hasLiked)
	}, [totalLikes])

	const style = clsx(isLoved && loveStyle)
	return (
		<>
			{totalNumberOfLikes}
			<IconButton aria-label='love' onClick={clickHandeler}>
				<FavoriteIcon className={style} />
			</IconButton>{' '}
		</>
	)
}

const SinglePost = ({
	headline,
	image,
	text,
	_id: postID,
	user: { _id: postUserID },
	totalLikes,
}: PostType) => {
	const { push } = useRouter()

	const visibleTextLength = 500
	const { root, imageHover, cardHeaderStyle } = useStyles()

	const moreOptions = ['save', 'Report']

	const partOfText = text.substr(0, visibleTextLength)

	const showMoreLink = `/post/${postUserID}/${postID}`

	const loveProps = { postID, postUserID, totalLikes }

	const redirectToPostPage = () => {
		push(showMoreLink)
	}

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
				className={imageHover}
				layout='responsive'
				height={720}
				width={1280}
				objectFit='cover'
				onClick={redirectToPostPage}
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
			</CardActions>
		</Card>
	)
}

export default SinglePost
