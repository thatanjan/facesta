import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { nanoid } from 'nanoid'

import MuiLink from 'components/Links/MuiLink'

interface Props {
	content: string
	showMoreLink: string
	postPage: boolean
}

const PostContentForPage = ({ content }: { content: string }) => {
	const paragraphs = content.split('\n')
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

const PostContent = ({ postPage, showMoreLink, content }: Props) => {
	const idealLength = 200

	const visibleText = content.substr(0, idealLength - 1)

	const isThereMore = content.length > idealLength

	const paragraphs = visibleText.split('\n')

	return (
		<CardContent>
			{!postPage && (
				<>
					{paragraphs.map(paragraph => (
						<Typography key={nanoid()} variant='body1' component='p'>
							{paragraph}
						</Typography>
					))}

					{isThereMore && (
						<>
							<span> ...</span>{' '}
							<MuiLink
								href={showMoreLink}
								MuiComponent={Typography}
								variant='body1'
								align='center'
							>
								show more
							</MuiLink>
						</>
					)}
				</>
			)}

			{postPage && <PostContentForPage {...{ content }} />}
		</CardContent>
	)
}

export default PostContent
