import { gql } from 'graphql-request'

// eslint-disable-next-line
export const createPost = gql`
	mutation createPost($text: String!) {
		createPost(Input: { text: $text }) {
			text
		}
	}
`
