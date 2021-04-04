import { getPersonalData, getUser } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'
import { useProfileUserID } from 'hooks/profileContextHooks'

const useGetPersonalData = (output?: string | undefined) => {
	const mutation = getPersonalData(output)
	const user = useProfileUserID()
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
