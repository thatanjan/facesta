import React from 'react'
import dynamic from 'next/dynamic'
import CircularProgress from '@material-ui/core/CircularProgress'
import { nanoid } from 'nanoid'

import useGetPersonal from 'hooks/useGetPersonal'
import { useUserId, useIsSelf } from 'hooks/profileContextHooks'
import { DATE_OF_BIRTH } from 'utils/global'
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

const PersonalDetails = (props: Props) => {
	const isSelf = useIsSelf()
	const userId = useUserId()
	const { data, error } = useGetPersonal({ userId })
	console.log(data)

	return (
		<>
			{error && <div> Sorry, some error has occured </div>}
			{!data && <CircularProgress />}

			{data && (
				<>
					{personalDetailsField.map((field: string) => (
						<EachField
							key={nanoid()}
							property={field}
							value={data?.getPersonal[field]}
						/>
					))}
				</>
			)}

			<>{isSelf && <NewDetails />}</>
		</>
	)
}

export default PersonalDetails
