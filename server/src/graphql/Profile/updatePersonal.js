import User from 'models/User'
import Profile from 'models/Profile'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'

const resolver = {
	Mutation: {
		updatePersonalData: async (_, { Input }, { user: { id } }) => {
			try {
				const updateObject = {}

				const inputKeys = Object.keys(Input)

				inputKeys.forEach(item => {
					if (item !== 'name') {
						updateObject[`personal.${item}`] = Input[item]
					}
				})

				const update = await Profile.findOneAndUpdate({ user: id }, updateObject, {
					useFindAndModify: false,
				})

				if (Input.name) {
					const newName = Input.name

					const updateName = await User.findByIdAndUpdate(id, { name: newName })

					if (!updateName) return sendErrorMessage('error happened')
				}

				if (!update) return sendErrorMessage('update unsuccessful')

				return sendMessage('Update Successful')
			} catch (error) {
				sendErrorMessage(error)
			}
		},
	},
}

export default resolver
