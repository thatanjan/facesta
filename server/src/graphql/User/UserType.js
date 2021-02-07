import { gql } from 'apollo-server-express'

const id = `ownUserId: ID`

const UserType = gql`
    extend type Query {
        getUser(Input: getUserInput): User
    }

    extend type Mutation {
        loginUser(Input: loginInput): Login
        registerUser(Input: registerInput): Login
        deleteUser: Success!
    }

    type RegisterErrorMessages{
        name: String
        email: String
        password: String
        confirmPassword: String
    }

    type Login {
        token: String
        success: Boolean!
        errorMessage: String
        validationError : RegisterErrorMessages
    }

    type User {
        name: String
        ${id}
        profile: ID
        errorMessage: String
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

    input getUserInput {
        email: String
        ${id}
    }
`

export default UserType
