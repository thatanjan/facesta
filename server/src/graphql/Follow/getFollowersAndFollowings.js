import Follow from 'models/Follow'
import sendErrorMessage from 'utils/errorMessage'
import { FOLLOWEES, FOLLOWERS } from 'variables/global'

export const getUsers = field => async (_, { userID }, { user: { id } }) => {
	try {
		const query = await Follow.findOne({ user: userID || id }, field).populate(
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

const checkIfUser = field => async (_, { userID }, { user: { id } }) => {
	try {
		if (userID === id) {
			return sendErrorMessage('both id are same')
		}

		const query = await Follow.findOne({ user: id }, field)

		const ifUserExist = query[field].includes(userID)

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
