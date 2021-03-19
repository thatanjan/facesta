import Follow from 'models/Follow'
import sendErrorMessage from 'utils/errorMessage'
import { FOLLOWEES, FOLLOWERS } from 'variables/global'

export const getUsers = field => async (_, { Input: { user, start } }) => {
	const projection = {}

	if (field === FOLLOWERS) {
		projection[FOLLOWERS] = { $slice: [start, start + 10] }
		projection[FOLLOWEES] = { $slice: 0 }
	} else {
		projection[FOLLOWEES] = { $slice: [start, start + 10] }
		projection[FOLLOWERS] = { $slice: 0 }
	}

	try {
		const query = await Follow.findOne({ user }, projection).populate(
			field,
			'name _id'
		)

		const users = query[field]

		const returnObject = {}

		returnObject[field] = users

		return returnObject
	} catch (error) {
		return sendErrorMessage(error)
	}
}

const checkIfUser = field => async (_, { user }, { user: { id } }) => {
	try {
		if (user === id) {
			return sendErrorMessage('both id are same')
		}

		const query = await Follow.findOne({ user: id }, field)

		const ifUserExist = query[field].includes(user)

		const result = {}

		if (field === FOLLOWEES) {
			result.isFollowee = ifUserExist
		} else {
			result.isFollower = ifUserExist
		}

		return result
	} catch (error) {
		return sendErrorMessage(error)
	}
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
