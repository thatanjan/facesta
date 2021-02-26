import Follow from 'models/Follow'
import sendErrorMessage from 'utils/errorMessage'

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

			const ownerData = await getQuery(id, 'followee')
			const { followee } = ownerData

			if (followee.includes(otherUserID)) {
				return sendErrorMessage('You are already followee the user')
			}

			const otherUserData = await getQuery(otherUserID, 'followers')

			const { followers } = otherUserData

			followers.push(id)
			followee.push(otherUserID)

			saveDocuments([ownerData, otherUserData])

			return sendErrorMessage('you are now followee this user')
		},

		unfollowUser: async (_, { Input: { otherUserID } }, { user: { id } }) => {
			if (sameId(otherUserID, id)) {
				return sendErrorMessage('ownerId and other user id is same')
			}

			const ownerData = await getQuery(id, 'followee')
			const { followee } = ownerData

			if (!followee.includes(otherUserID)) {
				return sendErrorMessage('You are not followee the user')
			}

			const otherUserData = await getQuery(otherUserID, 'followers')

			const { followers } = otherUserData

			followers.remove(id)
			followee.remove(otherUserID)

			saveDocuments([ownerData, otherUserData])

			return sendErrorMessage('you have unfollowed this user')
		},
	},
}

export default resolver
