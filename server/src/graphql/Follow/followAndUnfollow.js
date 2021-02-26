import Follow from 'models/Follow'
import sendErrorMessage from 'utils/errorMessage'
import { FOLLOWING, FOLLOWEES, FOLLOWERS } from 'variables/global'

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

const resolver = {
	Mutation: {
		followUser: async (_, { Input: { otherUserID } }, { user: { id } }) => {
			if (sameId(otherUserID, id)) {
				return sendErrorMessage('ownerId and other user id is same')
			}

			const ownerData = await getQuery(id, FOLLOWEES)
			const { followees } = ownerData

			if (followees.includes(otherUserID)) {
				return sendErrorMessage('You are already following the user')
			}

			const otherUserData = await getQuery(otherUserID, FOLLOWERS)

			const { followers } = otherUserData

			followers.push(id)
			followees.push(otherUserID)

			saveDocuments([ownerData, otherUserData])

			return sendErrorMessage('you are now followee this user')
		},

		unfollowUser: async (_, { Input: { otherUserID } }, { user: { id } }) => {
			if (sameId(otherUserID, id)) {
				return sendErrorMessage('ownerId and other user id is same')
			}

			const ownerData = await getQuery(id, FOLLOWEES)
			const { followees } = ownerData

			if (!followees.includes(otherUserID)) {
				return sendErrorMessage('You are not following the user')
			}

			const otherUserData = await getQuery(otherUserID, FOLLOWERS)

			const { followers } = otherUserData

			followers.remove(id)
			followees.remove(otherUserID)

			saveDocuments([ownerData, otherUserData])

			return sendErrorMessage('you have unfollowed this user')
		},
	},
}

export default resolver
