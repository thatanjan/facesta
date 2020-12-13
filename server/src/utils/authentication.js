import User from 'models/User'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { GraphQLString } from 'graphql'

import { makeGraphQLNonNull } from 'utils/graphql'
import Profile from 'models/Profile'
import Follow from 'models/Follow'

export const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
    }

    const promise = new Promise((response, reject) => {
        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) return reject(err)

                response(token)
            }
        )
    })

    return promise
}

export const matchPasswords = async ({ hashedPassword, plainPassword }) => {
    const pass = await bcryptjs.compare(plainPassword, hashedPassword)

    return pass
}

export const findUser = (email) => User.findOne({ email })

export const authArguments = (authType = '') => {
    const stringType = { type: makeGraphQLNonNull(GraphQLString) }

    let args = {
        email: stringType,
        password: stringType,
    }

    if (authType === 'register') {
        args.name = stringType
        args.confirmPassword = stringType
    }

    return args
}

export const sendSuccessToken = (token) => ({
    token: 'Bearer ' + token,
    success: true,
})

export const createProfile = async () => {
    const profileData = {}

    try {
        const profile = new Profile(profileData)
        return profile
    } catch (error) {
        throw error
    }
}

export const createFollowCollection = async (id) => {
    try {
        return new Follow({ user: id })
    } catch (error) {
        console.log(error)
        throwError
    }
}

export const generateHashPassword = (password) => {
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
