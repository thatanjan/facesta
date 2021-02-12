import { gql } from 'graphql-request'

const expectedOutput = 'dateOfBirth skills name bio website status location'

export const getPersonalData = (output?: string | undefined): string => gql`
	 query getPersonalData($profileUserId: ID!) {
		 getPersonal(Input: { profileUserId: $profileUserId }) {
			    ${output || expectedOutput}
		 }
} `

export const getExperience = (output: string): string => gql`
	query getExperience($profileUserId: ID!) {
		getExperience(Input: { profileUserId: $profileUserId }){
			    ${output}
		}
} `

export const getEducation: string = gql`
	query getEducation($profileUserId: ID!) {
		getEducation(Input: { profileUserId: $profileUserId }) {
			id
			school
			degree
			fieldOfStudy
			from
			to
		}
	}
`
