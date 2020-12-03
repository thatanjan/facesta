import { generateToken, findUser, matchPasswords } from 'utils/authentication'
import LoginType from 'types/loginType'

import { authArguments } from 'utils/authentication'
import { throwError } from 'utils/error'
import validateLoginInput from 'validation/login'

const loginUser = {
    type: LoginType,
    args: authArguments(),
    resolve: async (parent, { email, password }) => {
        const { errors, isValid } = validateLoginInput({ email, password })

        if (!isValid) {
            return throwError(errors)
        }

        try {
            const user = await findUser(email)

            if (!user) {
                return throwError("user doesn't exist")
            }

            const doesPasswordsMatch = await matchPasswords({
                plainPassword: password,
                hashedPassword: user.password,
            })

            if (!doesPasswordsMatch) {
                return throwError("Passwords doesn't match ")
            }

            const token = await generateToken(user)

            return {
                token,
                success: true,
            }
        } catch (error) {
            return throwError(error)
        }
    },
}

export default loginUser
