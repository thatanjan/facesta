import { searchUser } from 'graphql/queries/searchQueries'
import useSWRgql from 'hooks/useSWRgql'

const useSearchUser = (query: string) => {
	const values = { query }

	return useSWRgql({
		key: searchUser,
		values,
		swrDependencies: query,
	})
}

export default useSearchUser
