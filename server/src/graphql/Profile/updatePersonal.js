import Profile from 'models/Profile'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'

const resolver = {
	Mutation: {
		updatePersonalData: async (_, { Input }, { user: { id } }) => {
			try {
				const inputKeys = Object.keys(Input)

				const personalData = await Profile.findOne({ user: id }, 'personal name')

				const { personal } = personalData

				inputKeys.forEach(item => {
					switch (item) {
						case 'name':
							personalData.name = Input.name

							break

						default:
							personal[item] = Input[item]
					}
				})

				personalData.save()

				return sendMessage('Update Successful')
			} catch (error) {
				sendErrorMessage(error)
			}
			return false
		},
	},
}

export default resolver
