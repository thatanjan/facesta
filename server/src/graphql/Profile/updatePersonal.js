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
							// updateObject['personal.image'] = 'publicID'
							// updateObject[`personal.${item}`] = publicID

							break

						default:
							updateObject['personal.image'] = 'publicID'
							updateObject[`personal.${item}`] = Input[item]
					}
				})

				setTimeout(() => console.log(updateObject), 1000)

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
			return false
		},
	},
}

export default resolver
