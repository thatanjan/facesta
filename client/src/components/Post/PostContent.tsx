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
		<CardContent>
			{paragraphs.map(paragraph => (
				<Typography key={nanoid()} variant='body1' component='p'>
					{paragraph}
				</Typography>
			))}
		</CardContent>
	)
}

const PostContent = ({ postPage, showMoreLink, text }: Props) => {
	const idealLength = 500

	let visibleText = text.substr(0, idealLength)

	const visibleTextLength = visibleText.length

	const lastTwoChar = visibleText.endsWith('\n')

	if (lastTwoChar) {
		visibleText = visibleText.substring(0, visibleTextLength - 2)
	}

	const paragraphs = visibleText.split('\n')

	return (
		<CardContent>
			{!postPage && (
				<>
					<Typography variant='body1' color='textSecondary' component='span'>
						{paragraphs[0]}

						{paragraphs.length >= 1 || visibleText.length > idealLength - 2 ? (
							<>
								<span> ...</span>{' '}
								<MuiLink href={showMoreLink} MuiComponent={Typography} variant='button'>
									show more
								</MuiLink>
							</>
						) : null}
					</Typography>
				</>
			)}

			{postPage && <PostContentForPage text={text} />}
		</CardContent>
	)
}

export default PostContent
