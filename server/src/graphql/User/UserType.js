import { gql } from 'apollo-server-express'

const UserType = gql`
    extend type Query {
        user(email: String!): User
    }

    extend type Mutation {
        loginUser(loginInput: loginInput): Token
        registerUser(registerInput: registerInput): Token
        deleteUser: Success!
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

    input registerInput {
        email: String!
        name: String!
        password: String!
        confirmPassword: String!
    }
`

export default UserType
