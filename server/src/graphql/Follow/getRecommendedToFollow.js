import Follow from 'models/Follow'
import sendErrorMessage from 'utils/errorMessage'

const resolvers = {
	Query: {
		getRecommendedToFollow: async () => {
			try {
				const aggregate = Follow.aggregate()

				const aggregateResult = await aggregate
					.match({ totalFollowers: { $gt: 0 } })
					.sort('-totalFollowers')
					.limit(10)
					.project('user')

				const populatedResult = await Follow.populate(aggregateResult, {
					path: 'user',
					select: '_id',
					populate: {
						path: 'profile',
						select: 'name profilePicture -_id',
					},
				})

				const users = populatedResult.map(({ user }) => user)

				return { users }
			} catch (e) {
				return sendErrorMessage(e)
			}
		},
	},
}

export default resolvers
