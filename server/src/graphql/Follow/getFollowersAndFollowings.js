import Follow from 'models/Follow'

const getUsers = (field) => async (_, { Input: { userId } }) =>
    await Follow.findOne({ user: userId }, field).populate(field)

const FOLLOWERS = 'followers'
const FOLLOWING = 'following'

const resolver = {
    Query: {
        getFollowers: getUsers(FOLLOWERS),
        getFollowing: getUsers(FOLLOWING),
    },
}

export default resolver
