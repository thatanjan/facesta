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

const NewDetails = dynamic(() => import('./NewDetailsForm'))

export const personalDetailsField = [
	'name',
	'bio',
	DATE_OF_BIRTH,
	'status',
	'website',
	'location',
]

interface Props {}

const DATE = 'date'
const PARSE_CAMEL = 'parse'

const PersonalDetails = (props: Props) => {
	const isSelf = useIsSelf()
	const userId = useUserId()
	const { data, error } = useGetPersonal({ userId })
	console.log(data)

	const doIfDateOfBirth = (value: string, operation: string) => {
		if (operation === DATE) {
			const date = new Date(value)

			return date.toDateString()
		}

		if (operation === PARSE_CAMEL) {
			return parseCamelCase(value)
		}
	}

	return (
		<AccordionDetails style={{ flexDirection: 'column' }}>
			{error && <div> Sorry, some error has occured </div>}
			{!data && <CircularProgress />}

			{data && (
				<>
					{personalDetailsField.map((field: string) => (
						<EachField
							key={nanoid()}
							property={field === DATE_OF_BIRTH ? parseCamelCase(field) : field}
							value={data?.getPersonal[field]}
						/>
					))}
				</>
			)}

			<>{isSelf && <NewDetails />}</>
		</AccordionDetails>
	)
}

export default PersonalDetails
