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
		followUser: async (
			_,
			{ Input: { otherUserId } },
			{ user: { id: ownerId } }
		) => {
			if (sameId(otherUserId, ownerId)) {
				return sendErrorMessage('ownerId and other user id is same')
			}

			const ownerData = await getQuery(ownerId, 'following')
			const { following } = ownerData

			if (following.includes(otherUserId)) {
				return sendErrorMessage('You are already following the user')
			}

			const otherUserData = await getQuery(otherUserId, 'followers')

			const { followers } = otherUserData

			followers.push(ownerId)
			following.push(otherUserId)

			saveDocuments([ownerData, otherUserData])

			return sendErrorMessage('you are now following this user')
		},

		unfollowUser: async (
			_,
			{ Input: { otherUserId } },
			{ user: { id: ownerId } }
		) => {
			if (sameId(otherUserId, ownerId)) {
				return sendErrorMessage('ownerId and other user id is same')
			}

			const ownerData = await getQuery(ownerId, 'following')
			const { following } = ownerData

			if (!following.includes(otherUserId)) {
				return sendErrorMessage('You are not following the user')
			}

			const otherUserData = await getQuery(otherUserId, 'followers')

			const { followers } = otherUserData

			followers.remove(ownerId)
			following.remove(otherUserId)

			saveDocuments([ownerData, otherUserData])

			return sendErrorMessage('you have unfollowed this user')
		},
	},
}

export default resolver
