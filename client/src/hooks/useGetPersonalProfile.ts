import { getPersonalData } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'

const useGetPersonal = (profileUserId: string) => {
	const mutation = getPersonalData()
	const values = { profileUserId }

	return useSWRgql({
		key: mutation,
		values,
		swrDependencies: profileUserId,
	})
}

export default useGetPersonal
