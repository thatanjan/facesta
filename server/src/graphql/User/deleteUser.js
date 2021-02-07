import { createConnection } from 'mongoose'

import sendMessage from 'utils/error'
import User from 'models/User'
import Profile from 'models/Profile'
import Follow from 'models/Follow'

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
            try {
                const user = await User.findById(id)

                if (!user) {
                    return sendMessage(false, 'no user found')
                }

                const queryCondition = { user: id }

                await Profile.findOneAndDelete(queryCondition)
                await deletePostCollection(id)
                await Follow.findOneAndDelete(queryCondition)

                const removedUser = await user.remove()

                if (!removedUser) {
                    return sendMessage(false, 'user account is not deleted')
                }

                return sendMessage(
                    true,
                    null,
                    'your account is successfully deleted'
                )
            } catch (error) {
                return sendMessage(false, error)
            }
        },
    },
}

export default resolver
