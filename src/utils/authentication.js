import User from 'models/User'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { GraphQLString } from 'graphql'

import { makeGraphQLNonNull } from 'utils/graphql'
import { secretKey } from 'config/keys'

export const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
    }

    const promise = new Promise((response, reject) => {
        jwt.sign(payload, secretKey, (err, token) => {
            if (err) return reject(err)

            response(token)
        })
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
