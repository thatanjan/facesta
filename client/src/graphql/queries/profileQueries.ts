import { gql } from 'graphql-request'

const expectedOutput = 'dateOfBirth skills name bio website status location'

export const getPersonalData = (output?: string | undefined): string => gql`
	 query getPersonalData($profileOwnerID: ID!) {
		 getPersonalData(Input: { profileOwnerID: $profileOwnerID }) {
			    ${output || expectedOutput}
		 }
} `

export const getExperience = (output: string): string => gql`
	query getExperience($profileOwnerID: ID!) {
		getExperience(Input: { profileOwnerID: $profileOwnerID }){
			    ${output}
		}
} `

export const getEducation: string = gql`
	query getEducation($profileOwnerID: ID!) {
		getEducation(Input: { profileOwnerID: $profileOwnerID }) {
			id
			school
			degree
			fieldOfStudy
			from
			to
		}
	}
`
