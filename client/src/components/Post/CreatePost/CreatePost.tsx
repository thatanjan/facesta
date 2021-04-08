import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Input from '@material-ui/core/Input'

const CreatePostModal = dynamic(() => import('./CreatePostModal'), {
	loading: () => <CircularLoader />,
})

const useStyles = makeStyles({
	inputGridItem: {
		flexGrow: 1,
		display: 'grid',
	},
	inputStyle: {
		width: '100%',
		'&&&:before': {
			borderBottom: 'none',
		},
		'&&:after': {
			borderBottom: 'none',
		},
		'& > input': {
			cursor: 'pointer',
		},
	},
})

interface Props {
	setShouldMutate: (bool: boolean) => void
}

export const CreatePost = ({ setShouldMutate }: Props) => {
	const { inputStyle, inputGridItem } = useStyles()

	const [isClicked, setIsClicked] = useState(false)

	const inputClickHandler = () => {
		setIsClicked(!isClicked)
	}

	return (
		<>
			<Card>
				<CardContent>
					<Grid container>
						<Grid item>
							<IconButton edge='start'>
								<AccountCircleIcon />
							</IconButton>
						</Grid>
						<Grid item className={inputGridItem}>
							<Input
								placeholder='write your feelings'
								className={inputStyle}
								onClick={inputClickHandler}
							/>
						</Grid>
						{isClicked && (
							<CreatePostModal {...{ isClicked, setIsClicked, setShouldMutate }} />
						)}
					</Grid>
				</CardContent>
			</Card>
		</>
	)
}

export default CreatePost
