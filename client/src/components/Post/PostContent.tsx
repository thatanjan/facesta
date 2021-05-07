import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { nanoid } from 'nanoid'

import MuiLink from 'components/Links/MuiLink'

interface Props {
	text: string
	showMoreLink: string
	postPage: boolean
}

const PostContentForPage = ({ text }: { text: string }) => {
	const paragraphs = text.split('\n')
	return (
		<>
			{paragraphs.map(paragraph => (
				<Typography key={nanoid()} variant='body1' component='p'>
					{paragraph}
				</Typography>
			))}
		</>
	)
}

const PostContent = ({ postPage, showMoreLink, text }: Props) => {
	const idealLength = 500

	const firstTextSlice = text.split('\n')[0]

	let visibleText = ''

	const isThereMore =
		firstTextSlice.length > idealLength || text.length > idealLength

	if (isThereMore) {
		visibleText = firstTextSlice.substr(0, idealLength - 1)
	}

	return (
		<CardContent>
			{!postPage && (
				<>
					<Typography variant='body1' color='textSecondary' component='span'>
						{visibleText}

						{isThereMore && (
							<>
								<span> ...</span>{' '}
								<MuiLink href={showMoreLink} MuiComponent={Typography} variant='button'>
									show more
								</MuiLink>
							</>
						)}
					</Typography>
				</>
			)}

			{postPage && <PostContentForPage text={text} />}
		</CardContent>
	)
}

export default PostContent
