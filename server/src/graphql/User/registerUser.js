import jwt from 'jsonwebtoken'
import { hash } from 'bcryptjs'

import { findUser } from 'utils/authentication'
import sendErrorMessage from 'utils/errorMessage'
import validateRegisterInput from 'validation/register'
import User from 'models/User'
import Profile from 'models/Profile'
import Follow from 'models/Follow'
import NewsFeed from 'models/NewsFeed'
import { ERROR_MESSAGE } from 'variables/global'

const createUser = async ({ name, email, password }) => {
	try {
		const hashedPassword = await hash(password, 10)

		const profile = new Profile({ name })

		const newsFeed = new NewsFeed()

		const userModelData = {
			email,
			password: hashedPassword,
			profile: profile._id,
			newsfeed: newsFeed._id,
		}

		const newUser = new User(userModelData)

		const newUserID = newUser._id

		newsFeed.user = newUserID
		profile.user = newUserID

		profile.save()

		const follow = new Follow({ user: newUserID })

		follow.save()

		newsFeed.save()

		return newUser.save()
	} catch (error) {
		return sendErrorMessage(error)
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

				if (newUser[ERROR_MESSAGE]) {
					return newUser[ERROR_MESSAGE]
				}

				const { _id } = newUser

				const token = jwt.sign({ id: _id }, process.env.SECRET_KEY, {
					expiresIn: '7d',
				})

				return { token: `Bearer ${token}` }
			} catch (error) {
				return sendErrorMessage(error)
			}
		},
	},
}

export default resolver
