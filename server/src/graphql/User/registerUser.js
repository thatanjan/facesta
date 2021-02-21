import {
	findUser,
	generateToken,
	createProfile,
	createFollowCollection,
	generateHashPassword,
} from 'utils/authentication'

import sendErrorMessage from 'utils/errorMessage'
import validateRegisterInput from 'validation/register'
import User from 'models/User'
import NewsFeedModel from 'models/NewsFeed'

// eslint-disable-next-line
const createUser = async ({ name, email, password }) => {
	const hashedPassword = await generateHashPassword(password)

	const profile = await createProfile()

	const newsFeed = new NewsFeedModel()

	const userModelData = {
		name,
		email,
		password: hashedPassword,
		profile: profile._id,
		newsfeed: newsFeed._id,
	}

	try {
		const newUser = new User(userModelData)

		const newUserId = newUser._id

		newsFeed.user = newUserId
		profile.user = newUser._id

		profile.save()

		const followCollection = await createFollowCollection(newUser._id)

		followCollection.save()

		newsFeed.save()
		return newUser.save()
	} catch (error) {
		sendErrorMessage(error)
	}
}

export const validationErrorMessage = errors => ({
	validationError: errors,
})

const resolver = {
	Mutation: {
		registerUser: async (
			_,
			{ Input: { email, name, password, confirmPassword } }
		) => {
			const { errors, isValid } = validateRegisterInput({
				name,
				email,
				password,
				confirmPassword,
			})

			if (!isValid) {
				return validationErrorMessage(errors)
			}

			try {
				const user = await findUser(email)

				if (user) {
					return sendErrorMessage('User already exist')
				}

				const newUser = await createUser({ name, email, password })

				if (!newUser) {
					return sendErrorMessage('Registering user failed. Please try again later.')
				}

				const { _id } = newUser

				const token = await generateToken({ _id, name, email })

				return { token }
			} catch (error) {
				return sendErrorMessage(error)
			}
		},
	},
}

export default resolver
