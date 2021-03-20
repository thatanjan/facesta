import { hasLiked } from 'graphql/queries/postQueries'
import useSWRgql from './useSWRgql'

interface GetPost {
	postID: string
	user: string
}

// eslint-disable-next-line
export const useHasLiked = ({ postID, user }: GetPost) => {
	return useSWRgql({
		key: hasLiked,
		swrDependencies: postID,
		values: { postID, user },
	})
}
