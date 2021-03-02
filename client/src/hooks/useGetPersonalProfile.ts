import { getPersonalData } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'
import { useProfileUserId } from 'hooks/profileContextHooks'

const useGetPersonal = () => {
	const mutation = getPersonalData()
	const profileOwnerID = useProfileUserId()
	const values = { profileOwnerID }

	return useSWRgql({
		key: mutation,
		values,
		swrDependencies: profileOwnerID,
	})
}

export default useGetPersonal
