import { gql } from 'apollo-server-express'

const id = `id: ID!`

const UserType = gql`
    extend type Query {
        getUser(getUserInput: getUserInput): User
    }

    extend type Mutation {
        loginUser(loginInput: loginInput): Login
        registerUser(registerInput: registerInput): Login
        deleteUser: Success!
    }

    type Login {
        token: String
        success: Boolean!
        errorMessage: String
    }

    type User {
        name: String!
        ${id}
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
