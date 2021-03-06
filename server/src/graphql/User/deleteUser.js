import { createConnection } from 'mongoose'

import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'
import User from 'models/User'
import Profile from 'models/Profile'
import Follow from 'models/Follow'
import NewsFeedModel from 'models/NewsFeed'

const deletePostCollection = async id => {
	const connection = createConnection(process.env.POSTS_DB_URI)

	try {
		await connection.dropCollection(id)
		return true
	} catch (error) {
		return false
	}
}

const resolver = {
	Mutation: {
		deleteUser: async (_, __, { user: { id } }) => {
			try {
				const user = await User.findById(id)

				if (!user) {
					return sendErrorMessage('no user found')
				}

				const queryCondition = { user: id }

				await Profile.findOneAndDelete(queryCondition)
				await deletePostCollection(id)
				await Follow.findOneAndDelete(queryCondition)
				await NewsFeedModel.findOneAndDelete(queryCondition)

				const removedUser = await user.remove()

				if (!removedUser) {
					return sendErrorMessage('user account is not deleted')
				}

				return sendMessage('your account is successfully deleted')
			} catch (error) {
				return sendErrorMessage(error)
			}
		},
	},
}

export default resolver
