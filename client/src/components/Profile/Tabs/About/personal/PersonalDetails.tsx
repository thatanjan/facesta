import React from 'react'
import dynamic from 'next/dynamic'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import { nanoid } from 'nanoid'

import { useGetPersonalData } from 'hooks/useGetProfileData'
import { useIsSelf, useProfileUserID } from 'hooks/profileContextHooks'
import { DATE_OF_BIRTH } from 'variables/global'
import parseCamelCase from 'utils/parseCamelCase'
import EachField from 'components/Profile/Tabs/About/DetailsPreview'

const NewDetails = dynamic(() => import('./NewDetails'))

export const personalDetailsField = [
	'name',
	'bio',
	DATE_OF_BIRTH,
	'status',
	'website',
	'location',
]

export const doIfDateOfBirthField = (field: string): string => {
	if (field === DATE_OF_BIRTH) {
		return parseCamelCase(field)
	}
	return field
}

const doIfDateOfBirthValue = (field: string, value: string): string | null => {
	if (!value) return null

	if (field === DATE_OF_BIRTH) {
		const date = new Date(value)

		return date.toDateString()
	}
	return value
}

const PersonalDetails = () => {
	const isSelf = useIsSelf()
	const profileUserID = useProfileUserID()

	const { data, error } = useGetPersonalData(profileUserID)

	if (!data) return '...loading'

	const { getPersonalData } = data

	return (
		<>
			{error && <div> Sorry, some error has occured </div>}
			{!data && <CircularProgress />}

			{data && (
				<Box style={{ padding: '20px' }}>
					{personalDetailsField.map((field: string) => {
						return (
							<EachField
								key={nanoid()}
								property={doIfDateOfBirthField(field)}
								value={doIfDateOfBirthValue(field, getPersonalData[field])}
							/>
						)
					})}
				</Box>
			)}

			<>{isSelf && <NewDetails />}</>
		</>
	)
}

export default PersonalDetails
