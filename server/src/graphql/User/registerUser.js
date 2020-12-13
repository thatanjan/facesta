import {
    findUser,
    generateToken,
    sendSuccessToken,
    createProfile,
    createFollowCollection,
    generateHashPassword,
} from 'utils/authentication'

import { throwError } from 'utils/error'
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
        throw error
    }
}

const resolver = {
    Mutation: {
        registerUser: async (
            _,
            { registerInput: { email, name, password, confirmPassword } }
        ) => {
            const { errors, isValid } = validateRegisterInput({
                name,
                email,
                password,
                confirmPassword,
            })

            if (!isValid) {
                return throwError(errors)
            }

            try {
                const user = await findUser(email)

                if (user) {
                    return throwError('User already exist')
                }

                const newUser = await createUser({ name, email, password })

                if (!newUser) {
                    return throwError(
                        'Registering user failed. Please try again later.'
                    )
                }

                const { _id } = newUser

                const token = await generateToken({ _id, name, email })

                return sendSuccessToken(token)
            } catch (error) {
                return throwError(error)
            }
        },
    },
}

export default resolver
