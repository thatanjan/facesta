import { createConnection } from 'mongoose'

import { sendMessage, throwError } from 'utils/error'
import User from 'models/User'
import Profile from 'models/Profile'

const deletePostCollection = async (id) => {
    const connection = createConnection(process.env.POSTS_DB_URI)

    try {
        await connection.dropCollection(id)
    } catch (error) {
        return false
    }
}

const resolver = {
    Mutation: {
        deleteUser: async (_, __, { user: { id } }) => {
            const user = await User.findById(id)

            if (!user) {
                return sendMessage(false, 'no user found')
            }

            try {
                Profile.findOneAndDelete({ user: id })
                deletePostCollection(id)
            } catch (error) {
                return throwError(error)
            }

            const removedUser = await user.remove()

            if (!removedUser) {
                return throwError('user account is not deleted')
            }

            return sendMessage(true, 'your account is successfully deleted')
        },
    },
}

export default resolver
