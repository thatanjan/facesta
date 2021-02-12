import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { nanoid } from 'nanoid'

// import ArrayChips from 'components/arrayChips/arrayChips'
import { DATE_OF_BIRTH } from 'variables/global'

const useStyles = makeStyles((theme: Theme) => ({
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
	value: string | string[]
}

const EachField = ({ property, value }: Props) => {
	const { fieldContainer, propertyField, colon } = useStyles()

	if (!value) {
		return null
	}

	const ifSkills = (value: string | string[]) => {
		if (typeof value === 'string' && !Array.isArray(value)) {
			return <Typography>{value}</Typography>
		}

		return ''
		/* return <ArrayChips skills={value} /> */
	}

	return (
		<Grid container className={fieldContainer}>
			<Grid item className={propertyField}>
				<Typography>{property}</Typography>
			</Grid>
			<Grid item className={colon}>
				<Typography>:</Typography>
			</Grid>

			<Grid item> {ifSkills(value)} </Grid>
		</Grid>
	)
}

export const personalDetailsField = [
	'name',
	'bio',
	DATE_OF_BIRTH,
	'status',
	'website',
	'skills',
	'location',
]

export default EachField
