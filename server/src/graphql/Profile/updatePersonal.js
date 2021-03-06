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
					if (!Input[item]) {
						updateObject[`personal.${item}`] = Input[item]
					}
				})

				const update = await Profile.findOneAndUpdate({ user: id }, updateObject)

				if (!update) return sendErrorMessage('update unsuccessful')

				return sendMessage('Update Successful')
			} catch (error) {
				sendErrorMessage(error)
			}
		},
	},
}

export default resolver
