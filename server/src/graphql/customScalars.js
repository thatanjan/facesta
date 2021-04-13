import { gql } from 'apollo-server-express'
import { DateTimeResolver } from 'graphql-scalars'

const DateTypeDefs = gql`
	scalar Date
`

const DateResolvers = {
	Date: DateTimeResolver,
}

export { DateTypeDefs, DateResolvers }
