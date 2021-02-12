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

const EachField = ({ property, value }: any) => {
	const { fieldContainer, propertyField, colon } = useStyles()

	if (!value) {
		return null
	}

	// eslint-disable-next-line
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

export const PersonalDetails = ({ data }: any) => {
	const newData = data
	const { box } = useStyles()

	const skills: string[] = newData?.skills

	if (newData[DATE_OF_BIRTH]) {
		const dateOfBirth = newData[DATE_OF_BIRTH]
		const date = new Date(dateOfBirth)

		newData[DATE_OF_BIRTH] = date.toDateString()
	}

	return (
		<Box className={box}>
			{personalDetailsField.map((item: string) => (
				<EachField
					property={item === DATE_OF_BIRTH ? 'date of birth' : item}
					value={newData[item]}
					key={nanoid()}
				/>
			))}
		</Box>
	)
}

export default EachField
