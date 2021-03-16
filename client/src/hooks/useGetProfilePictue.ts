import { getProfilePicture } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'
import { useProfileUserID } from 'hooks/profileContextHooks'

const useGetProfilePicture = () => {
	const userID = useProfileUserID()
	const values = { userID }

	return useSWRgql({
		key: getProfilePicture,
		values,
		swrDependencies: userID,
	})
}

export default useGetProfilePicture
