import { ConfigInterface } from 'swr'
import { getPersonalData } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'

interface Props {
	ownUserId: string
	swrOptions?: ConfigInterface | undefined
}

const useGetPersonal = ({ ownUserId, swrOptions }: Props) => {
	const mutation = getPersonalData()
	const values = { ownUserId }

	return useSWRgql({
		operation: mutation,
		values,
		swrOptions,
		swrDependencies: ownUserId,
	})
}

export default useGetPersonal
