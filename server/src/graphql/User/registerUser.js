import {
    findUser,
    generateToken,
    sendSuccessToken,
    createProfile,
    createFollowCollection,
    generateHashPassword,
} from 'utils/authentication'

import sendMessage from 'utils/error'
import validateRegisterInput from 'validation/register'
import User from 'models/User'

const createUser = async ({ name, email, password }) => {
    const hashedPassword = await generateHashPassword(password)

    const profile = await createProfile()

    const userModelData = {
        name,
        email,
        password: hashedPassword,
        profile: profile._id,
    }

    try {
        const newUser = new User(userModelData)

        profile.user = newUser._id

        profile.save()

        const followCollection = await createFollowCollection(newUser._id)

        followCollection.save()

        return newUser.save()
    } catch (error) {
        sendMessage(false, error)
    }
}

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
                return sendMessage(false, errors)
            }

            try {
                const user = await findUser(email)

                if (user) {
                    return sendMessage(false, 'User already exist')
                }

                const newUser = await createUser({ name, email, password })

                if (!newUser) {
                    return sendMessage(
                        false,
                        'Registering user failed. Please try again later.'
                    )
                }

                const { _id } = newUser

                const token = await generateToken({ _id, name, email })

                return sendSuccessToken(token)
            } catch (error) {
                return sendMessage(false, error)
            }
        },
    },
}

export default resolver
