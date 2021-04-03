import Follow from 'models/Follow'
import sendErrorMessage from 'utils/errorMessage'
import { FOLLOWEES, FOLLOWERS } from 'variables/global'
import skippingList from 'utils/skippingList'

const getFollowers = async (_, { Input: { user, skip } }) => {
	try {
		const { totalFollowers } = await Follow.findOne({ user }, 'totalFollowers')

		const { newSkip, returnNumber, empty } = skippingList(skip, totalFollowers)

		const response = {}

		if (empty) {
			response[FOLLOWERS] = []
			return response
		}

		const query = await Follow.findOne({ user })
			.slice(FOLLOWERS, [-Math.abs(newSkip), returnNumber])
			.slice(FOLLOWEES, 0)

			.populate({
				path: FOLLOWERS,
				select: 'name _id',
				populate: {
					path: 'profile',
					select: 'profilePicture',
				},
			})

		response[FOLLOWERS] = query[FOLLOWERS]

		return response
	} catch (error) {
		sendErrorMessage(error)
	}
}

const getFollowees = async (_, { Input: { user, skip } }) => {
	try {
		const { totalFollowees } = await Follow.findOne({ user }, 'totalFollowees')

		const { newSkip, returnNumber, empty } = skippingList(skip, totalFollowees)

		const response = {}

		if (empty) {
			response[FOLLOWEES] = []
			return response
		}

		const query = await Follow.findOne({ user })
			.slice(FOLLOWEES, [-Math.abs(newSkip), returnNumber])
			.slice(FOLLOWERS, 0)

			.populate({
				path: FOLLOWEES,
				select: 'name _id',
				populate: {
					path: 'profile',
					select: 'profilePicture',
				},
			})

		response[FOLLOWEES] = query[FOLLOWEES]

		return response
	} catch (error) {
		sendErrorMessage(error)
	}
}

const checkIfUser = field => async (_, { user }, { user: { id } }) => {
	try {
		if (user === id) {
			return sendErrorMessage('both id are same')
		}

		const filter = {}
		filter[field] = { $in: user }

		const query = await Follow.findOne({ user: id, ...filter }, 'user')

		let doesUserExist = false

		if (query) {
			doesUserExist = true
		}

		const result = {}

		if (field === FOLLOWEES) {
			result.isFollowee = doesUserExist
		} else {
			result.isFollower = doesUserExist
		}

		return result
	} catch (error) {
		return sendErrorMessage(error)
	}
}

const resolver = {
	Query: {
		getFollowers,
		getFollowees,
		getIsFollower: checkIfUser(FOLLOWERS),
		getIsFollowee: checkIfUser(FOLLOWEES),
	},
}

export default resolver
