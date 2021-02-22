import { findUser, matchPasswords } from 'utils/authentication'
import generateToken from 'utils/generateToken'
import sendErrorMessage from 'utils/errorMessage'
import validateLoginInput from 'validation/login'
import { validationErrorMessage } from './registerUser'

const resolver = {
	Mutation: {
		loginUser: async (_, { Input: { email, password } }) => {
			const { errors, isValid } = validateLoginInput({ email, password })

			if (!isValid) {
				return validationErrorMessage(false, errors)
			}

			try {
				const user = await findUser(email)

				if (!user) {
					return sendErrorMessage("user doesn't exist")
				}

				const doesPasswordsMatch = await matchPasswords({
					plainPassword: password,
					hashedPassword: user.password,
				})

				if (!doesPasswordsMatch) {
					return sendErrorMessage("Passwords doesn't match ")
				}

				const token = await generateToken(user)

				return { token }
			} catch (error) {
				return sendErrorMessage(error)
			}
		},
	},
}

export default resolver
