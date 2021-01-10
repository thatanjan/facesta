import { gql } from 'graphql-request'

export const updatePersonal = (output: string) => gql`
	updatePersonal($userId:ID!){
		updatePersonal(Input: { userId: $userId }){
			${output}
		}
	}
`
