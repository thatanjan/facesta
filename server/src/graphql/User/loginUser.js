import {
    generateToken,
    findUser,
    matchPasswords,
    sendSuccessToken,
} from 'utils/authentication'
import { throwError } from 'utils/error'
import validateLoginInput from 'validation/login'

const resolver = {
    Mutation: {
        loginUser: async (_, { loginInput: { email, password } }, context) => {
            console.log(context)

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

                return sendSuccessToken(token)
            } catch (error) {
                return throwError(error)
            }
        },
    },
}

export default resolver
