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

            const ownerData = await Follow.findOne(
                { user: ownerId },
                'following'
            )

            const { following } = ownerData

            if (following.includes(id)) {
                return sendMessage(false, 'You are already following the user')
            }

            const otherUserData = await Follow.findOne(
                { user: id },
                'followers'
            )

            const { followers } = otherUserData

            followers.push(ownerId)
            following.push(id)

            ownerData.save()
            otherUserData.save()

            return sendMessage(true, 'you are now following this user')
        },
    },
}

export default resolver
