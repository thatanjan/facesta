import merge from 'lodash/merge'

import ProfileType from './ProfileType'

import updatePersonal from './updatePersonal'
import getProfile from './getProfile'
import addToProfile from './addToProfile'
import updateSocial from './updateSocial'
import updateSingleField from './updateSingleField'
import updateProfilePicture from './profilePicture'

export const ProfileTypedefs = [ProfileType]

export const ProfileResolvers = merge(
	updatePersonal,
	getProfile,
	addToProfile,
	updateSocial,
	updateSingleField,
	updateProfilePicture
)
