import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/'

const buttonOption = ['About', 'Follwers', 'Follwing', 'Posts', 'More']

const useStyles = makeStyles(({ typography: { pxToRem } }) => ({
	containerStyle: {
		padding: `${pxToRem(10)} 0`,
	},
}))

export const HorizontalMenu = () => {
	const { containerStyle } = useStyles()
	return (
		<>
			<Grid className={containerStyle} container justify='space-around'>
				{buttonOption.map(item => (
					<Grid item>
						<Button>
							<Typography>{item}</Typography>
						</Button>
					</Grid>
				))}
			</Grid>
		</>
	)
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalMenu)
