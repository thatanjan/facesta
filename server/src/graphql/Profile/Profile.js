import merge from 'lodash/merge'

import ProfileType from './ProfileType'

import updatePersonal from './updatePersonal'
import getPersonal from './getPersonal'
import addToProfile from './addToProfile'

export const ProfileTypedefs = [ProfileType]

export const ProfileResolvers = merge(updatePersonal, getPersonal, addToProfile)
