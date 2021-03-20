import { gql } from 'graphql-request'

// eslint-disable-next-line
export const createPost = gql`
	mutation createPost(
		$text: String!
		$image: String!
		$headline: String!
		$markdown: Boolean!
	) {
		createPost(
			Input: {
				text: $text
				image: $image
				headline: $headline
				markdown: $markdown
			}
		) {
			errorMessage
			message
		}
	}
`
