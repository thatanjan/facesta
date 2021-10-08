import React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import CommentIcon from '@material-ui/icons/Comment'
import Typography from '@material-ui/core/Typography'
import Image from 'next/image'
import { responseInterface } from 'swr'

import { useGetTotalComment } from 'hooks/commentHooks'
import useSmallerThanXS from 'hooks/mediaQueries/useSmallerThanXS'

import MuiLink from 'components/Links/MuiLink'
import UserAvatar from 'components/Avatars/UserAvatar'

import PostType from 'interfaces/post'

import { useUserID } from 'redux/hooks/stateHooks'

const LikePost = dynamic(() => import('./LikePost'))

const PostContent = dynamic(() => import('./PostContent'))

const PostDropDownMenu = dynamic(
	() => import('components/DropDownMenu/PostDropDownMenu')
)

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

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
		[theme.breakpoints.down('xs')]: {
			paddingLeft: '5px',
		},
	},
	noShadow: {
		boxShadow: 'none',
	},
	CardActionsStyle: {
		justifyContent: 'space-evenly',
	},
}))

interface Props extends PostType {
	postPage: boolean
}

const SinglePost = ({
	title,
	images,
	text,
	_id: postID,
	user: {
		_id: postUserID,
		profile: { name, profilePicture },
	},
	totalLikes,
	totalComments,
	postPage,
	date,
	hasLiked,
}: Props) => {
	const matches = useSmallerThanXS()
	const userID = useUserID()

	const { push } = useRouter()

	const {
		CardActionsStyle,
		noShadow,
		root,
		imageHover,
		cardHeaderStyle,
	} = useStyles()

	const showMoreLink = `/post/${postUserID}/${postID}`

	const loveProps = { postID, postUserID, totalLikes, hasLiked }

	const postContentProps = { text, postPage, showMoreLink }

	const redirectToPostPage = () => {
		push(showMoreLink)
	}

	let totalNumberOfComments: number | undefined

	const totalCommentsResult: responseInterface<
		any,
		any
	> | null = useGetTotalComment({
		postPage,
		postID,
	})

	if (totalCommentsResult?.error) {
		return <SwrErrorAlert />
	}

	if (totalCommentsResult?.data) {
		const data = totalCommentsResult?.data
		totalNumberOfComments = data?.getTotalComments?.totalComments
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
				avatar={
					<UserAvatar
						alt={name}
						href={`/profile/${postUserID}`}
						imageID={profilePicture}
					/>
				}
				action={
					userID === postUserID && (
						<>
							<PostDropDownMenu postID={postID} />
						</>
					)
				}
				title={title}
				titleTypographyProps={{
					variant: 'h6',
					component: 'h1',
				}}
				subheader={
					<>
						<Typography component='span' variant='body2'>
							{new Date(date).toDateString()},{' by '}
						</Typography>
						<MuiLink
							href={`/profile/${postUserID}`}
							MuiComponent={Typography}
							color='textPrimary'
							component='span'
							variant='body2'
						>
							{name}
						</MuiLink>
					</>
				}
			/>
			<Image
				src={images[0]}
				className={imageHover}
				layout='responsive'
				height={720}
				width={1280}
				objectFit='cover'
				quality={50}
				onClick={redirectToPostPage}
			/>

			{userID && (
				<CardActions disableSpacing className={CardActionsStyle}>
					<LikePost {...loveProps} />

					<Box>
						<Typography variant='caption'>
							{totalNumberOfComments || totalComments}
						</Typography>

						<IconButton
							aria-label='comment'
							onClick={() => push(`/post/${postUserID}/${postID}`)}
						>
							<CommentIcon fontSize={matches ? 'small' : undefined} />
						</IconButton>
					</Box>
				</CardActions>
			)}

			<PostContent {...postContentProps} />
		</Card>
	)
}

export default SinglePost
