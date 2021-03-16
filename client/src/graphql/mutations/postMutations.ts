import { gql } from 'graphql-request'
import { ERROR_OR_MESSAGE } from 'variables/global'

// eslint-disable-next-line
export const createPost = gql`
	mutation createPost($text: String!, $image:String, headline:String! markdown:Boolean! ) {
		createPost(Input:{text: $text, image:$image, headline:$headline, markdown:$markdown}) {
					${ERROR_OR_MESSAGE}
				}
			}
	`
