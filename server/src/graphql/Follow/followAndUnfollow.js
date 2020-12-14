import Follow from 'models/Follow'

const sendMessage = (success, message) => ({
    success,
    message,
})

const resolver = {
    Mutation: {
        followUser: async (_, { input: { id } }, { user: { id: ownerId } }) => {
            if (id === ownerId) {
                return sendMessage(false, 'ownerId and other user id is same')
            }

            const result = await Follow.findOne({ user: ownerId }, 'following')
            const { following } = result

            if (following.includes(id)) {
                return sendMessage(false, 'You are already following the user')
            }

            following.push(id)

            result.save()

            return sendMessage(true, 'you are now following this user')
        },
    },
}

export default resolver
