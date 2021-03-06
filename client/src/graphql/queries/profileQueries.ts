import { gql } from 'graphql-request'

const expectedOutput = 'dateOfBirth skills name bio website status location'

export const getPersonalData = (output?: string | undefined): string => gql`
	 query getPersonalData($userID: ID!) {
		 getPersonalData(userID: $userID) {
			    ${output || expectedOutput}
		 }
} `

export const getExperience = (output: string): string => gql`
	query getExperience($profileOwnerID: ID!) {
		getExperience(  profileOwnerID: $profileOwnerID ){
			    ${output}
		}
} `

export const getEducation: string = gql`
	query getEducation($profileOwnerID: ID!) {
		getEducation(profileOwnerID: $profileOwnerID) {
			id
			school
			degree
			fieldOfStudy
			from
			to
		}
	}
`
