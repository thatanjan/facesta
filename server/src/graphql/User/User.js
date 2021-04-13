import merge from 'lodash/merge'

import loginUser from 'graphql/User/loginUser'
import registerUser from 'graphql/User/registerUser'
import deleteUser from 'graphql/User/deleteUser'

import UserType from './UserType'

export const UserTypeDefs = [UserType]

export const UserResolvers = merge(loginUser, registerUser, deleteUser)
