import { gql } from 'graphql-request'

const expectedOutput = 'dateOfBirth skills name bio website status location'

export const getPersonalData = (output?: string | undefined): string => gql`
	 query getPersonalData($userId: ID!) {
		 getPersonal(Input: { userId: $userId }) {
			    ${output || expectedOutput}
		 }
} `

export const getExperience = (output: string): string => gql`
	query getExperience($userId: ID!) {
		getExperience(Input: { userId: $userId }){
			    ${output}
		}
} `

export const getEducation: string = gql`
	query getEducation($userId: ID!) {
		getEducation(Input: { userId: $userId }) {
			id
			school
			degree
			fieldOfStudy
			from
			to
		}
	}
`
