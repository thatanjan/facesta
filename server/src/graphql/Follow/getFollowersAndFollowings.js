import Follow from 'models/Follow'

const getUsers = (field) => {
    return async (_, { input: { userId } }) => {
        const users = await Follow.findOne({ user: userId }, field)

        return users
    }
}

const resolver = {
    Query: {
        getFollowers: getUsers('followers'),
        getFollowing: getUsers('following'),
    },
}

export default resolver
