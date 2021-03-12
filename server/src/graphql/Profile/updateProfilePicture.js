import Profile from 'models/Profile'
import uploadImage from 'utils/uploadToCloudinary'
import sendErrorMessage from 'utils/errorMessage'
import sendMessage from 'utils/message'
import imageConfig from 'variables/cloudinaryVariables'

const PATH = 'profile/'

const PROFILE_PICTUE = 'profilePicture'

const resolvers = {
	Mutation: {
		uploadProfilePicture: async (_, { image }, { user: { id } }) => {
			const profileData = await Profile.findOne({ user: id }, PROFILE_PICTUE)

			const { image: currentImage } = profileData

			const imageID = await uploadImage(image, { folder: PATH, ...imageConfig })

			profileData[PROFILE_PICTUE] = imageID

			const res = await profileData.save()

			if (res) return sendMessage('Profile Picture uploaded successfully')

			return sendErrorMessage('error')
		},
	},
}

export default resolvers
