import { getAllPost } from 'graphql/queries/postQueries'
import useSWRgql from 'hooks/useSWRgql'
import { useProfileUserID } from 'hooks/profileContextHooks'

const useGetAllPost = (start: number) => {
	const mutation = getAllPost
	const userID = useProfileUserID()
	const values = { userID, start }

	return useSWRgql({
		key: mutation,
		values,
		swrDependencies: mutation,
	})
}

export default useGetAllPost
