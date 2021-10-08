import { gql } from 'apollo-server-express'
import { MESSAGE_TYPE, ERROR_MESSAGE_TYPE } from 'variables/commonText'

const EMAIL_PASSWORD = `
        email: String!
        password: String!
`

const UserType = gql`
    extend type Mutation {
        loginUser(Input: LoginInput!): Login!
        registerUser(Input: RegisterInput!): Login!
        deleteUser: Response!
    }

    type ValidationErrorMessages{
        name: String
        email: String
        password: String
        confirmPassword: String
    }

    type Login{
        token: String
        ${MESSAGE_TYPE} 
        ${ERROR_MESSAGE_TYPE}
        validationError: ValidationErrorMessages
    }

    input LoginInput {
        ${EMAIL_PASSWORD}
    }

    input RegisterInput {
        ${EMAIL_PASSWORD}
        name: String!
        confirmPassword: String!
    }

`

export default UserType
