import { getPersonalData } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'
import { useProfileUserId } from 'hooks/profileContextHooks'

const useGetPersonal = () => {
	const mutation = getPersonalData()
	const profileUserId = useProfileUserId()
	const values = { profileUserId }

	return useSWRgql({
		key: mutation,
		values,
		swrDependencies: profileUserId,
	})
}

export default useGetPersonal
