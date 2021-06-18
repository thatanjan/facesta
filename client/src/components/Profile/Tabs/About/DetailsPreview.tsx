import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import MuiLink from 'components/Links/MuiLink'

const useStyles = makeStyles(() => ({
	box: {
		flexBasis: '100%',
	},
	fieldContainer: {
		width: '100%',
		textTransform: 'capitalize',
	},
}))

interface Props {
	property: string
	value: string | null
}

const EachField = ({ property, value }: Props) => {
	const { fieldContainer } = useStyles()

	if (!value) {
		return null
	}

	return (
		<Grid container className={fieldContainer}>
			<Grid item xs={3}>
				<Typography>{property}</Typography>
			</Grid>
			<Grid item xs={2}>
				<Typography>:</Typography>
			</Grid>

			<Grid item xs={7}>
				{property === 'website' ? (
					<MuiLink
						MuiComponent={Typography}
						href={value}
						style={{ textTransform: 'lowercase' }}
						target='_blank'
					>
						{value}
					</MuiLink>
				) : (
					<Typography>{value}</Typography>
				)}
			</Grid>
		</Grid>
	)
}

export default EachField
