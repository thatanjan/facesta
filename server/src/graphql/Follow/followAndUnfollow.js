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

const mainResolver = field => async (_, { user }, { user: { id } }) => {
	try {
		if (sameId(user, id)) {
			return sendErrorMessage('ownerId and other user id is same')
		}

		const doesUserExist = await User.findById(user, 'name')

		if (!doesUserExist) {
			return sendErrorMessage('user does not exist')
		}

		const myFollowees = await getQuery(id, FOLLOWEES)
		const { followees } = myFollowees

		if (field === FOLLOW && followees.includes(user)) {
			return sendErrorMessage('You are already following the user')
		}

		if (field === UNFOLLOW && !followees.includes(user)) {
			return sendErrorMessage('You are not following the user')
		}

		const hisFollowers = await getQuery(user, FOLLOWERS)

		const { followers } = hisFollowers

		switch (field) {
			case FOLLOW:
				followers.push(id)
				followees.push(user)

				saveDocuments([myFollowees, hisFollowers])

				return sendMessage('you are now following this user')

			case UNFOLLOW:
				followers.remove(id)
				followees.remove(user)

				saveDocuments([myFollowees, hisFollowers])

				return sendMessage('you have unfollowed this user')

			default:
				return true
		}
	} catch (error) {
		sendErrorMessage(error)
	}
}

const followUser = async (_, { user }, { user: { id } }) => {
	try {
		if (sameId(user, id)) {
			return sendErrorMessage('ownerId and other user id is same')
		}

		const doesUserExist = await User.findById(user, 'name')

		if (!doesUserExist) {
			return sendErrorMessage('user does not exist')
		}

		const filter = {}
		filter.followees = { $in: user }

		const followeesQuery = await Follow.findOne({ user: id, ...filter }, 'user')

		if (followeesQuery) {
			return sendErrorMessage('You are already following the user')
		}

		const followeesUpdate = await Follow.updateOne(
			{ user: id },
			{ $push: { followees: user } }
		)

		const followersUpdate = await Follow.updateOne(
			{ user },
			{ $push: { followers: id } }
		)

		if (followeesUpdate.nModified === 1 && followersUpdate.nModified === 1)
			return sendMessage('you are now following this user')

		return sendErrorMessage('something went wrong')
	} catch (error) {
		return sendErrorMessage(error)
	}
}

const resolver = {
	Mutation: {
		followUser,
		unfollowUser: mainResolver(UNFOLLOW),
	},
}

export default resolver
