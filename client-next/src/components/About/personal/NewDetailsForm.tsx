import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core'

interface Props {}

const NewDetailsForm = (props: Props) => {
	return <div>hello woelf</div>
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
	buttonStyle: {
		marginTop: spacing(4),
	},
	dividerStyle: {
		marginTop: spacing(2),
		height: spacing(0.3),
		width: '100%',
	},
}))

const NewDetails = () => {
	const { buttonStyle } = useStyles()
	return (
		<>
			<Grid container justify='flex-end'>
				<Grid item>
					<Button variant='contained' color='secondary' className={buttonStyle}>
						update your profile
					</Button>
				</Grid>
			</Grid>
		</>
	)
}

export default NewDetails
