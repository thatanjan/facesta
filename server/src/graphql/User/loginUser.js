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
        loginUser: async (_, { Input: { email, password } }) => {
            const { errors, isValid } = validateLoginInput({ email, password })

            if (!isValid) {
                return sendMessage({ success: false, errorMessage: errors })
            }

            try {
                const user = await findUser(email)

                if (!user) {
                    return sendMessage({
                        success: false,
                        errorMessage: "user doesn't exist",
                    })
                }

                const doesPasswordsMatch = await matchPasswords({
                    plainPassword: password,
                    hashedPassword: user.password,
                })

                if (!doesPasswordsMatch) {
                    return sendMessage({
                        success: false,
                        errorMessage: "Passwords doesn't match ",
                    })
                }

                const token = await generateToken(user)

                return sendSuccessToken(token)
            } catch (error) {
                return sendMessage({ success: false, errorMessage: error })
            }
        },
    },
}

export default resolver
