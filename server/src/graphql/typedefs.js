import { gql } from 'apollo-server-express'

import { UserTypeDefs } from 'graphql/User/User'
import { PostTypedefs } from 'graphql/Post/Post'

const Query = gql`
    type Query {
        _empty: String
    }
`

const Mutation = gql`
    type Mutation {
        _empty: String
    }
`

const typeDefs = [Query, Mutation, ...UserTypeDefs, ...PostTypedefs]

export default typeDefs
