import { compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { findUser } from 'utils/authentication'
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

				const doesPasswordsMatch = compareSync(password, user.password)

				if (!doesPasswordsMatch) {
					return sendErrorMessage("Passwords doesn't match ")
				}

				const { _id } = user

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
