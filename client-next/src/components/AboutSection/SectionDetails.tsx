import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { nanoid } from 'nanoid'

import { DATE_OF_BIRTH } from './NewDetailForm'

const useStyles = makeStyles((theme: Theme) => ({
	box: {
		flexBasis: '100%',
	},
	fieldContainer: {
		width: '100%',
	},
	propertyField: {
		flexBasis: '20%',
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

	let skillsString: string | undefined

	if (skills && Array.isArray(skills) && skills.length >= 1) {
		skillsString = skills.join(' ')
	}

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

const SectionDetails = () => {
	const { box } = useStyles()
	return (
		<Box className={box}>
			<EachField property='School' value='HSC' />
			<EachField property='Postion' value='Student' />
			<EachField property='From' value='2011' />
			<EachField property='To' value='2017' />
		</Box>
	)
}

export default SectionDetails
