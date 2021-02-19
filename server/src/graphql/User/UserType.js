import { gql } from 'apollo-server-express'
import { OWNER_ID_TYPE } from 'variables/commonText'

const UserType = gql`
    
    extend type Mutation {
        loginUser(Input: loginInput): Login
        registerUser(Input: registerInput): Login
        deleteUser: ErrorOrMessage!
    }

    union Login = LoginToken | Error | ValidationErrorMessages

    type ValidationError {
        validationError: ValidationErrorMessages
    }

    type ValidationErrorMessages{
        name: String
        email: String
        password: String
        confirmPassword: String
    }

    type LoginToken {
        token: String
    }

    type User {
        name: String
        ${OWNER_ID_TYPE}
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

`

export default UserType
