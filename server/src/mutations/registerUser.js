import bcryptjs from 'bcryptjs'

import LoginType from 'types/loginType'
import {
    authArguments,
    findUser,
    generateToken,
    sendSuccessToken,
} from 'utils/authentication'

import { throwError } from 'utils/error'
import validateRegisterInput from 'validation/register'
import User from 'models/User'
import Profile from 'models/Profile'

const createProfile = async () => {
    const profileData = {}

    try {
        const profile = new Profile(profileData)

        return profile
    } catch (error) {
        throw Error(error.message)
    }
}

const generateHashPassword = (password) => {
    const passwordPromise = new Promise((resolve, reject) => {
        bcryptjs.genSalt(10, (_, salt) => {
            bcryptjs.hash(password, salt, (error, hash) => {
                if (error) reject(error)

                password = hash
                resolve(password)
            })
        })
    })

    return passwordPromise
}

const createUser = async ({ name, email, password }) => {
    const hashedPassword = await generateHashPassword(password)

    console.log(hashedPassword)
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

        return newUser.save()
    } catch (error) {
        console.log(error)
        throw Error(error.message)
    }
}

const isErrorInstance = (instance) => {
    if (instance instanceof Error) {
        return true
    }
}

const registerUser = {
    type: LoginType,
    args: authArguments('register'),
    resolve: async (_, { name, email, password, confirmPassword }) => {
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

            const { _id } = newUser

            const token = await generateToken({ _id, name, email })

            return sendSuccessToken(token)
        } catch (error) {
            return throwError(error)
        }
    },
}

export default registerUser
