import User from 'models/User'
import Profile from 'models/Profile'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'
import uploadImage from 'utils/uploadToCloudinary'
import imageConfig from 'variables/cloudinaryVariables'
import cloudinary from 'cloudinary'
import deleteOldImage from 'utils/deleteImageFromCloudinary'

const PATH = 'profile/'

const resolver = {
	Mutation: {
		updatePersonalData: async (_, { Input }, { user: { id } }) => {
			try {
				const updateObject = {}

				const inputKeys = Object.keys(Input)

				const personalData = await Profile.findOne({ user: id }, 'personal')

				const { personal } = personalData

				console.log(personalData)
				// eslint-disable-next-line
				inputKeys.forEach(async item => {
					switch (item) {
						case 'name':
							break

						case 'image':
							const {
								personal: { image: oldImageID },
							} = personalData

							const deleteImageRes = await deleteOldImage({
								path: PATH,
								imageID: oldImageID,
							})

							if (deleteImageRes.message)
								return sendErrorMessage('some thing went wrong')

							const { image } = Input

							const publicID = await uploadImage(image, {
								...imageConfig,
								folder: PATH,
							})

							console.log(publicID)

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
