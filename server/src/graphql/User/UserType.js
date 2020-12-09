import { gql } from 'apollo-server-express'

const UserType = gql`
    extend type Query {
        user(email: String!): User
    }

    extend type Mutation {
        loginUser(loginInput: loginInput): Token
    }

    type Token {
        token: String!
        success: Boolean!
    }

    type User {
        name: String!
        id: ID!
    }

    input loginInput {
        email: String!
        password: String!
    }
`

export default UserType
