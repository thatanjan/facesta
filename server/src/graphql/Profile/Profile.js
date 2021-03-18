import merge from 'lodash/merge'

import ProfileType from './ProfileType'

import updatePersonal from './updatePersonal'
import getProfile from './getProfile'
import ProfilePicture from './profilePicture'

export const ProfileTypedefs = [ProfileType]

export const ProfileResolvers = merge(
	updatePersonal,
	getProfile,
	ProfilePicture
)
