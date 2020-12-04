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

const createProfile = async (id) => {
    const profileData = {
        user: id,
    }

    try {
        const profile = new Profile(profileData)

        console.log(profile)
        profile.save()

        return profile
    } catch (error) {
        return error
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

    const userModelData = {
        name,
        email,
        password: hashedPassword,
    }

    try {
        const newUser = new User(userModelData)

        return newUser
    } catch (error) {
        return error
    }
}

const isErrorInstance = (instance) => {
    if (instance instanceof Error) {
        return true
    }
}

const checkError = (instances) => {
    for (let instance of instances) {
        console.log(instance)
        if (isErrorInstance(instance)) {
            console.log(instance)
            return instance
        }
    }
    return false
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

            const profile = await createProfile(newUser._id)

            const isError = checkError([newUser, profile])
            console.log(isError)

            if (isError) {
                return throwError(isError.message)
            }

            console.log(typeof newUser)

            const token = await generateToken(newUser)

            // console.log(token)

            return sendSuccessToken(token)
        } catch (error) {
            return throwError(error)
        }
    },
}

export default registerUser
