import React from 'react'
import dynamic from 'next/dynamic'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { nanoid } from 'nanoid'

import useGetPersonal from 'hooks/useGetPersonalProfile'
import { useProfileUserId, useIsSelf } from 'hooks/profileContextHooks'
import { DATE_OF_BIRTH, SKILLS } from 'variables/global'
import parseCamelCase from 'utils/parseCamelCase'
// import EachField from 'components/AboutSection/SectionDetails'

const NewDetails = dynamic(() => import('./NewDetails'))

export const personalDetailsField = [
	'name',
	'bio',
	DATE_OF_BIRTH,
	'status',
	SKILLS,
	'website',
	'location',
]

interface Props {}

export const doIfDateOfBirthField = (field: string): string => {
	if (field === DATE_OF_BIRTH) {
		return parseCamelCase(field)
	}
	return field
}

const doIfDateOfBirthValue = (field: string, value: string): string => {
	if (field === DATE_OF_BIRTH) {
		const date = new Date(value)

		return date.toDateString()
	}
	return value
}

const PersonalDetails = (props: Props) => {
	const isSelf = useIsSelf()
	const profileUserId = useProfileUserId()

	const { data, error } = useGetPersonal(profileUserId)

	return (
		<>
			{error && <div> Sorry, some error has occured </div>}
			{!data && <CircularProgress />}

			{data && (
				<Box style={{ padding: '20px' }}>
					{personalDetailsField.map((field: string) => {
						if (
							Array.isArray(data.getPersonal[field]) &&
							data.getPersonal[field].length === 0
						) {
							return null
						}

						return <div></div>
					})}
				</Box>
			)}

			<>{isSelf && <NewDetails />}</>
		</>
	)
}

// <EachField
// 	key={nanoid()}
// 	property={doIfDateOfBirthField(field)}
// 	value={doIfDateOfBirthValue(field, data?.getPersonal[field])}
// />
export default PersonalDetails
