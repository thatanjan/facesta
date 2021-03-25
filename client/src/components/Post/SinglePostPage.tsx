import React from 'react'
import Image from 'next/image'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useRouter } from 'next/router'

import { useGetSinglePost } from 'hooks/useGetPost'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			boxShadow: 'none',
		},
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9
		},
	})
)

const SinglePostPage = () => {
	const { root, media } = useStyles()

	const {
		query: { post, postUser },
	} = useRouter()

	const { data, error } = useGetSinglePost({
		user: postUser as string,
		postID: post as string,
	})

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	console.log(data)

	const {
		getSinglePost: {
			post: { image, headline, text },
		},
	} = data

	return (
		<Card className={root}>
			<CardHeader
				action={
					<IconButton aria-label='settings'>
						<MoreVertIcon />
					</IconButton>
				}
				title={headline}
				subheader='September 14, 2016'
			/>
			<Image
				className={media}
				src={image}
				layout='responsive'
				height={720}
				width={1280}
			/>
			<CardContent>
				<Typography variant='body2' color='textSecondary' component='p'>
					{text}
				</Typography>
			</CardContent>

			<CardActions disableSpacing>
				<IconButton aria-label='add to favorites'>
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label='share'>
					<ShareIcon />
				</IconButton>
			</CardActions>
		</Card>
	)
}

export default SinglePostPage
