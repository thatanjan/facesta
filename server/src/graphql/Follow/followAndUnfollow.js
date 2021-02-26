import Follow from 'models/Follow'
import User from 'models/User'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'
import { FOLLOWEES, FOLLOWERS } from 'variables/global'

const FOLLOW = 'follow'
const UNFOLLOW = 'unfollow'

const getQuery = async (id, projection) => {
	const users = await Follow.findOne({ user: id }, projection)

	return users
}

const sameId = (id1, id2) => {
	if (id1 === id2) {
		return true
	}
	return false
}

const saveDocuments = documents => {
	documents.forEach(document => document.save())
}

const mainResolver = field => async (
	_,
	{ Input: { otherUserID } },
	{ user: { id } }
) => {
	if (sameId(otherUserID, id)) {
		return sendErrorMessage('ownerId and other user id is same')
	}

	const doesUserExist = await User.findById(otherUserID, 'name')

	if (!doesUserExist) {
		return sendErrorMessage('user does not exist')
	}

	const ownerData = await getQuery(id, FOLLOWEES)
	const { followees } = ownerData

	if (field === FOLLOW && followees.includes(otherUserID)) {
		return sendErrorMessage('You are already following the user')
	}

	if (field === UNFOLLOW && !followees.includes(otherUserID)) {
		return sendErrorMessage('You are not following the user')
	}

	const otherUserData = await getQuery(otherUserID, FOLLOWERS)

	const { followers } = otherUserData

	switch (field) {
		case FOLLOW:
			followers.push(id)
			followees.push(otherUserID)

			saveDocuments([ownerData, otherUserData])

			return sendMessage('you are now following this user')

		case UNFOLLOW:
			followers.remove(id)
			followees.remove(otherUserID)

			saveDocuments([ownerData, otherUserData])

			return sendMessage('you have unfollowed this user')

		default:
			return true
	}
}

const resolver = {
	Mutation: {
		followUser: mainResolver(FOLLOW),
		unfollowUser: mainResolver(UNFOLLOW),
	},
}

export default resolver
