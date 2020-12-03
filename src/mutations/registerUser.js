import UserType from 'types/userType'
import bcryptjs from 'bcryptjs'
import { authArguments, findUser } from 'utils/authentication'

import validateRegisterInput from 'validation/register'
import User from 'models/User'

const generateHashPassword = (password) => {
    const passwordPromise = new Promise((resolve, reject) => {
        bcryptjs.genSalt(10, (error, salt) => {
            bcryptjs.hash(password, salt, (error, hash) => {
                if (error) reject(error)

                password = hash
                resolve(password)
            })
        })
    })

    return passwordPromise
}

const createUser = ({ name, email, password }) => {
    return generateHashPassword(password).then((hashedPassword) => {
        const userModelData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new User(userModelData)

        return newUser.save()
    })
}

const registerUser = {
    type: UserType,
    args: authArguments('register'),
    resolve: (parent, { name, email, password, confirmPassword }) => {
        const { errors, isValid } = validateRegisterInput({
            name,
            email,
            password,
            confirmPassword,
        })

        if (!isValid) {
            const newError = new Error(errors)
            newError.message = errors

            throw newError
        }

        return findUser(email).then((user) => {
            if (user) {
                return new Error('user exist')
            }

            return createUser({ name, email, password }).then((user) => user)
        })
    },
}

export default registerUser
