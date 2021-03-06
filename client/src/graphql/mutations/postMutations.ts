import { gql } from 'graphql-request'
import { ERROR_OR_MESSAGE } from 'variables/global'

// eslint-disable-next-line
export const createPost = gql`
	mutation createPost($text: String!) {
		createPost(text: $text) {
			${ERROR_OR_MESSAGE}
		}
	}
`
