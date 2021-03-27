import React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CommentIcon from '@material-ui/icons/Comment'
import Image from 'next/image'

import PostType from 'interfaces/post'

import LovePost from './LovePost'
import PostContent from './PostContent'

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
	cardHeaderStyle: {
		[theme.breakpoints.down('md')]: {
			'& > .MuiCardHeader-title': {
				backgroundColor: 'red',
				fontSize: '1.3rem',
			},
		},
	},
	noShadow: {
		boxShadow: 'none',
	},
}))

interface Props extends PostType {
	postPage: boolean
}

const SinglePost = ({
	headline,
	image,
	text,
	_id: postID,
	user: { _id: postUserID },
	totalLikes,
	postPage,
}: Props) => {
	const { push } = useRouter()

	const { noShadow, root, imageHover, cardHeaderStyle } = useStyles()

	const moreOptions = ['save', 'Report']

	const showMoreLink = `/post/${postUserID}/${postID}`

	const loveProps = { postID, postUserID, totalLikes }

	const postContentProps = { text, postPage, showMoreLink }

	const redirectToPostPage = () => {
		push(showMoreLink)
	}

	return (
		<Card
			className={root}
			classes={{
				root: postPage ? noShadow : undefined,
			}}
		>
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
			<CardActions disableSpacing>
				<LovePost {...loveProps} />
				<IconButton aria-label='comment'>
					<CommentIcon />
				</IconButton>
				<IconButton aria-label='share'>
					<ShareIcon />
				</IconButton>
			</CardActions>

			<PostContent {...postContentProps} />
		</Card>
	)
}

export default SinglePost
