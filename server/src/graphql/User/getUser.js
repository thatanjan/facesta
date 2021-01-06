import { findUserById } from 'utils/authentication'
import { sendMessage } from 'utils/error'

const resolver = {
    Query: {
        getUser: async (_, { getUserInput: { id } }) => {
            try {
                const user = await findUserById(id)

                if (!user) {
                    return sendMessage(false, 'no user found')
                }

                const { _id, name, profile } = user

                return { id: _id, name, profile }
            } catch (error) {
                return sendMessage(false, 'something went wrong')
            }
        },
    },
}

export default resolver
