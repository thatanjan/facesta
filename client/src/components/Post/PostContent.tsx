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
	const idealLength = 300

	const visibleText = text.substr(0, idealLength - 1)
	const paragraphs = visibleText.split('\n')

	const isThereMore = paragraphs.length > 1 || text.length > idealLength

	return (
		<CardContent>
			{!postPage && (
				<>
					<Typography>
						{' '}
						{paragraphs[0]}
						{isThereMore && (
							<>
								<span> ...</span>{' '}
								<MuiLink
									href={showMoreLink}
									MuiComponent={Typography}
									variant='body1'
									align='center'
									style={{ display: 'inline' }}
								>
									show more
								</MuiLink>
							</>
						)}
					</Typography>
				</>
			)}

			{postPage && <PostContentForPage {...{ text }} />}
		</CardContent>
	)
}

export default PostContent
