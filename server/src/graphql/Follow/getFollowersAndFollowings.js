import Follow from 'models/Follow'

const getUsers = (field) => {
    return async (_, { input: { id } }) => {
        const users = await Follow.findOne({ user: id }, field)

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
