import { gql } from 'apollo-server-express'

const UserType = gql`
    extend type Query {
        user(email: String!): User
    }

    extend type Mutation {
        loginUser(loginInput: loginInput): Login
        registerUser(registerInput: registerInput): Login
        deleteUser: Success!
    }

    type Login {
        token: String
        success: Boolean!
        message: String
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
