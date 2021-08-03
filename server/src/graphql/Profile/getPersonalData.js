import Profile from 'models/Profile'
import sendErrorMessage from 'utils/errorMessage'

const resolverFunction = () => {
	return async (_, { user }, { user: authUser }) => {
		try {
			const query = await Profile.findOne(
				{ user: user || authUser?.id },
				'personal name profilePicture'
			)

			if (!query) return sendErrorMessage('no profile found')

			const { name, profilePicture, personal } = query

			const response = { name, profilePicture, ...personal }

			return response
		} catch (error) {
			return sendErrorMessage(error)
		}
	}
}

const resolver = {
	Query: {
		getPersonalData: resolverFunction(),
	},
}

export default resolver
