import {
    generateToken,
    findUser,
    matchPasswords,
    sendSuccessToken,
} from 'utils/authentication'
import { sendMessage } from 'utils/error'
import validateLoginInput from 'validation/login'

const resolver = {
    Mutation: {
        loginUser: async (_, { loginInput: { email, password } }) => {
            const { errors, isValid } = validateLoginInput({ email, password })

            if (!isValid) {
                return sendMessage(false, errors)
            }

            try {
                const user = await findUser(email)

                if (!user) {
                    return sendMessage(false, "user doesn't exist")
                }

                const doesPasswordsMatch = await matchPasswords({
                    plainPassword: password,
                    hashedPassword: user.password,
                })

                if (!doesPasswordsMatch) {
                    return sendMessage(false, "Passwords doesn't match ")
                }

                const token = await generateToken(user)

                return sendSuccessToken(token)
            } catch (error) {
                return sendMessage(error)
            }
        },
    },
}

export default resolver
