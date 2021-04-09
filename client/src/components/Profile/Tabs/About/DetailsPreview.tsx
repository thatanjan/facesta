import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

// import ArrayChips from 'components/arrayChips/arrayChips'
import { DATE_OF_BIRTH } from 'variables/global'

const useStyles = makeStyles(() => ({
	box: {
		flexBasis: '100%',
	},
	fieldContainer: {
		width: '100%',
		textTransform: 'capitalize',
	},
	propertyField: {
		flexBasis: '20%',
		textTransform: 'capitalize',
	},
	colon: {
		flexBasis: '10%',
	},
}))

interface Props {
	property: string
	value: string | null
}

const EachField = ({ property, value }: Props) => {
	const { fieldContainer, propertyField, colon } = useStyles()

	if (!value) {
		return null
	}

	return (
		<Grid container className={fieldContainer}>
			<Grid item className={propertyField}>
				<Typography>{property}</Typography>
			</Grid>
			<Grid item className={colon}>
				<Typography>:</Typography>
			</Grid>

			<Grid item>
				<Typography>{value}</Typography>
			</Grid>
		</Grid>
	)
}

export default EachField
