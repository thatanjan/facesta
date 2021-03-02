import { getPersonalData } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'
import { useProfileUserId } from 'hooks/profileContextHooks'

const useGetPersonalData = (output: string | undefined) => {
	const mutation = getPersonalData(output)
	const profileOwnerID = useProfileUserId()
	const values = { profileOwnerID }

	return useSWRgql({
		key: mutation,
		values,
		swrDependencies: getPersonalData(),
	})
}

export default useGetPersonalData
