import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'

import CircularLoader from 'components/Loaders/CircularLoader'

const CreatePostModal = dynamic(() => import('./CreatePostModal'), {
	loading: () => <CircularLoader />,
})

const useStyles = makeStyles({
	container: {
		flexGrow: 1,
		display: 'grid',
		alignItems: 'center',
	},
	cardStyle: {
		cursor: 'pointer',
	},
})

interface Props {
	setShouldMutate: (bool: boolean) => void
}

export const CreatePost = ({ setShouldMutate }: Props) => {
	const { cardStyle, container } = useStyles()

	const [isClicked, setIsClicked] = useState(false)

	const clickHandler = (e: any) => {
		setIsClicked(!isClicked)
	}

	return (
		<>
			<Card className={cardStyle} onClick={clickHandler}>
				<CardContent>
					<Grid container>
						<Grid item>
							<IconButton edge='start'>
								<AccountCircleIcon />
							</IconButton>
						</Grid>
						<Grid item className={container}>
							<Typography>Write your feelings</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			{isClicked && (
				<CreatePostModal {...{ isClicked, setIsClicked, setShouldMutate }} />
			)}
		</>
	)
}

export default CreatePost
