import Profile from 'models/Profile'

const resolver = {
	Mutation: {
		updatePersonalData: async (_, { Input }, { user: { id } }) => {
			const updateObject = {}

			// eslint-disable-next-line
			for (const i in Input) {
				if (Input) {
					updateObject[`personal.${i}`] = Input[i]
				}
			}

			const update = await Profile.findOneAndUpdate({ user: id }, updateObject, {
				projection: 'personal',
				useFindAndModify: false,
				new: true,
			})

			return update.personal
		},
	},
}

export default resolver
