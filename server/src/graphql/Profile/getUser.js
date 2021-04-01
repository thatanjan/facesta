import User from 'models/User'
import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Query: {
		getUser: async (_, { userID }) => {
			try {
				const query = await User.findById(userID, 'name _id').populate({
					path: 'profile',
					select: 'profilePicture',
				})

				if (!query) return sendErrorMessage('no profile found')

				return query
			} catch (error) {
				return sendErrorMessage(error)
			}
		},
	},
}

export default resolver
