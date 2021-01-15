import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import useGetPersonal from 'hooks/useGetPersonal'
import { useUserId } from 'hooks/profileContextHooks'
import { DATE_OF_BIRTH } from 'utils/global'

export const personalDetailsField = [
	'name',
	'bio',
	DATE_OF_BIRTH,
	'status',
	'website',
	'skills',
	'location',
]

interface Props {}

const PersonalDetails = (props: Props) => {
	const userId = useUserId()
	const { data, error } = useGetPersonal({ userId })
	console.log(data)

	return (
		<>
			{error && <div> Sorry, some error has occured </div>}
			{!data && <CircularProgress />}
		</>
	)
}

export default PersonalDetails
