import Follow from 'models/Follow'
import { FOLLOWEES, FOLLOWERS } from 'variables/global'

export const getUsers = field => async (
	_,
	{ Input: { otherUserID } },
	{ user: { id } }
) => {
	const query = await Follow.findOne(
		{ user: otherUserID || id },
		field
	).populate(field, 'name _id')

	const users = query[field]

	users.forEach(user => {
		// eslint-disable-next-line
		user.anyUserID = user._id
	})

	const returnObject = {}

	returnObject[field] = users

	return returnObject
}

const checkIfUser = field => async (
	_,
	{ Input: { otherUserId } },
	{ user: { id: ownerId } }
) => {
	if (otherUserId === ownerId) {
		return false
	}
	const query = await Follow.findOne({ user: ownerId }, field)

	const ifUserExist = query[field].includes(otherUserId)

	const result = {}

	if (field === FOLLOWEES) {
		result.isFollowee = ifUserExist
	} else {
		result.isFollower = ifUserExist
	}

	return result
}

const resolver = {
	Query: {
		getFollowers: getUsers(FOLLOWERS),
		getFollowees: getUsers(FOLLOWEES),
		getIsFollower: checkIfUser(FOLLOWERS),
		getIsFollowee: checkIfUser(FOLLOWEES),
	},
}

export default resolver
