import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import MuiLink from 'components/Links/MuiLink'

interface Props {
	text: string
	postPage: boolean
	showMoreLink: string
}

const PostContent = ({ showMoreLink, text, postPage }: Props) => {
	const visibleTextLength = 500

	return (
		<CardContent>
			<Typography variant='body2' color='textSecondary' component='p'>
				{text.length > visibleTextLength && !postPage ? (
					<>
						{text.substr(0, visibleTextLength)}
						<span>...</span>
						<MuiLink href={showMoreLink} MuiComponent={Typography} variant='button'>
							show more
						</MuiLink>
					</>
				) : (
					text
				)}
			</Typography>
		</CardContent>
	)
}

export default PostContent
