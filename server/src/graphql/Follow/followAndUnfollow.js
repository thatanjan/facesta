import Follow from 'models/Follow'

const sendMessage = (success, message) => ({
    success,
    message,
})

const getQuery = async (id, projection) => {
    return await Follow.findOne({ user: id }, projection)
}

const following = 'following'
const followers = 'followers'

const sameId = (id1, id2) => {
    if (id1 === id2) {
        return true
    }
}

const resolver = {
    Mutation: {
        followUser: async (_, { input: { id } }, { user: { id: ownerId } }) => {
            if (sameId(id, ownerId)) {
                return sendMessage(false, 'ownerId and other user id is same')
            }

            const ownerData = await getQuery(ownerId, following)
            const { following } = ownerData

            if (following.includes(id)) {
                return sendMessage(false, 'You are already following the user')
            }

            const otherUserData = await getQuery(id, followers)

            const { followers } = otherUserData

            followers.push(ownerId)
            following.push(id)

            ownerData.save()
            otherUserData.save()

            return sendMessage(true, 'you are now following this user')
        },

        unfollowUser: async (
            _,
            { input: { id } },
            { user: { id: ownerId } }
        ) => {
            if (sameId(id, ownerId)) {
                return sendMessage(false, 'ownerId and other user id is same')
            }

            const ownerData = await getQuery(ownerId, following)
            const { following } = ownerData

            if (!following.includes(id)) {
                return sendMessage(false, 'You are not following the user')
            }

            const otherUserData = await getQuery(id, followers)

            const { followers } = otherUserData

            followers.remove(ownerId)
            following.remove(id)

            ownerData.save()
            otherUserData.save()

            return sendMessage(true, 'you have unfollowed this user')
        },
    },
}

export default resolver
