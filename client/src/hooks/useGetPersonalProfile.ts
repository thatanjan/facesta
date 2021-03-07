import { getPersonalData } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'
import { useProfileUserID } from 'hooks/profileContextHooks'

const useGetPersonalData = (output?: string | undefined) => {
	const mutation = getPersonalData(output)
	const profileOwnerID = useProfileUserID()
	const values = { profileOwnerID }

	return useSWRgql({
		key: mutation,
		values,
		swrDependencies: getPersonalData(),
	})
}

export default useGetPersonalData
