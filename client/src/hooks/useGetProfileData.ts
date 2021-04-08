import { getPersonalData, getUser } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'

export const useGetPersonalData = (user: string) => {
	const mutation = getPersonalData
	const values = { user }

	return useSWRgql({
		key: mutation,
		values,
		swrDependencies: user,
	})
}

export const useProfileInfo = (ID: string) => {
	return useSWRgql({
		key: getUser,
		values: { userID: ID },
		swrOptions: { revalidateOnFocus: false },
		swrDependencies: ID,
	})
}

export default useGetPersonalData
