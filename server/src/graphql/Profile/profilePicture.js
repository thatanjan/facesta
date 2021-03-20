import Profile from 'models/Profile'
import uploadImage from 'utils/uploadToCloudinary'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'
import imageConfig from 'variables/cloudinaryVariables'
import deleteImage from 'utils/deleteImageFromCloudinary'

const PATH = 'confession/profile/'

const PROFILE_PICTUE = 'profilePicture'

const UPLOAD = 'upload'
const REMOVE = 'remove'
const GET = 'get'

const mainResolver = operation => async (
	_,
	{ image, userID },
	{ user: { id } }
) => {
	try {
		const profileData = await Profile.findOne(
			{ user: userID || id },
			PROFILE_PICTUE
		)

		const currentImage = profileData[PROFILE_PICTUE]

		if (!currentImage && (operation === REMOVE || operation === GET)) {
			return sendErrorMessage('no image found')
		}

		if (currentImage) {
			if (operation === GET) {
				return { image: currentImage }
			}

			await deleteImage(currentImage)

			if (operation === REMOVE) {
				profileData[PROFILE_PICTUE] = ''

				await profileData.save()

				return sendMessage('Picture successfully deleted')
			}
		}

		const imageID = await uploadImage(image, { folder: PATH, ...imageConfig })

		profileData[PROFILE_PICTUE] = imageID

		const res = await profileData.save()

		if (res) return sendMessage('Profile Picture uploaded successfully')

		return sendErrorMessage('error')
	} catch (err) {
		return sendErrorMessage(err)
	}
}

const resolvers = {
	Mutation: {
		uploadProfilePicture: mainResolver(UPLOAD),
		removeProfilePicture: mainResolver(REMOVE),
	},
	Query: {
		getProfilePicture: mainResolver(GET),
	},
}

export default resolvers
