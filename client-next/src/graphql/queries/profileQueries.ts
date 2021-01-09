import { gql } from 'graphql-request'

export const getPersonal = (output: string): string => gql`
			 query getPersonal($userId: ID!) {
				 getPersonal(Input: { userId: $userId }) {
					    ${output}
				 }
} `
