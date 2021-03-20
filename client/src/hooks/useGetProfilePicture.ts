import { getProfilePicture } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'

const useGetProfilePicture = (user: string) => {
	const values = { user }

	return useSWRgql({
		key: getProfilePicture,
		values,
		swrDependencies: user,
	})
}

export default useGetProfilePicture
