import UserType from './UserType'
import merge from 'lodash/merge'
import loginUser from 'graphql/User/loginUser'

export const UserTypeDefs = [UserType]

export const UserResolvers = merge(loginUser)
