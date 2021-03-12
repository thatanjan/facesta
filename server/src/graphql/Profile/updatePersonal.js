import User from 'models/User'
import Profile from 'models/Profile'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'

const resolver = {
	Mutation: {
		updatePersonalData: async (_, { Input }, { user: { id } }) => {
			try {
				const inputKeys = Object.keys(Input)

				const personalData = await Profile.findOne({ user: id }, 'personal')

				const { personal } = personalData

				// eslint-disable-next-line
				inputKeys.forEach(async item => {
					switch (item) {
						case 'name':
							break

						default:
							personal[item] = Input[item]
					}
				})

				if (Input.name) {
					const newName = Input.name

					const updateName = await User.findByIdAndUpdate(id, { name: newName })

					if (!updateName) return sendErrorMessage('error happened')
				}

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
