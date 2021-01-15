import React from 'react'
import dynamic from 'next/dynamic'
import CircularProgress from '@material-ui/core/CircularProgress'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { nanoid } from 'nanoid'

import useGetPersonal from 'hooks/useGetPersonal'
import { useUserId, useIsSelf } from 'hooks/profileContextHooks'
import { DATE_OF_BIRTH } from 'utils/global'
import parseCamelCase from 'utils/parseCamelCase'
import EachField from 'components/AboutSection/SectionDetails'

const NewDetails = dynamic(() => import('./NewDetails'))

export const personalDetailsField = [
	'name',
	'bio',
	DATE_OF_BIRTH,
	'status',
	'website',
	'location',
]

interface Props {}

const doIfDateOfBirthField = (field: string): string => {
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
	const userId = useUserId()
	const { data, error } = useGetPersonal({ userId })
	console.log(data)

	return (
		<AccordionDetails style={{ flexDirection: 'column' }}>
			{error && <div> Sorry, some error has occured </div>}
			{!data && <CircularProgress />}

			{data && (
				<>
					{personalDetailsField.map((field: string) => (
						<EachField
							key={nanoid()}
							property={doIfDateOfBirthField(field)}
							value={doIfDateOfBirthValue(field, data?.getPersonal[field])}
						/>
					))}
				</>
			)}

			<>{isSelf && <NewDetails />}</>
		</AccordionDetails>
	)
}

export default PersonalDetails
