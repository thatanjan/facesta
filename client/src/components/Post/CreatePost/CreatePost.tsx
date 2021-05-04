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

import { useAppSelector, useAppDispatch } from 'redux/hooks/hooks'
import { openPostModal } from 'redux/slices/createPost'

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

export const CreatePost = () => {
	const { cardStyle, container } = useStyles()

	const { postModal } = useAppSelector(state => state.createPost)
	const dispatch = useAppDispatch()

	const clickHandler = () => {
		dispatch(openPostModal())
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
			{postModal && <CreatePostModal />}
		</>
	)
}

export default CreatePost
