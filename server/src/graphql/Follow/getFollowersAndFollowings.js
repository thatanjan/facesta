import Follow from 'models/Follow'

const getUsers = (field) => async (_, { input: { userId } }) =>
    await Follow.findOne({ user: userId }, field).populate(field)

const resolver = {
    Query: {
        getFollowers: getUsers('followers'),
        getFollowing: getUsers('following'),
    },
}

export default resolver
