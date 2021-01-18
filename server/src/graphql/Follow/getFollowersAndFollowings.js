import Follow from 'models/Follow'

const FOLLOWERS = 'followers'
const FOLLOWING = 'following'

const getUsers = (field) => async (_, { Input: { userId } }) =>
    await Follow.findOne({ user: userId }, field).populate(field)

const checkIfUser = (field) => async (
    _,
    { Input: { userId } },
    { user: { id: ownerId } }
) => {
    if (userId === ownerId) {
        return false
    }
    const query = await Follow.findOne({ user: ownerId }, field)

    const ifUserExist = query[field].includes(userId)

    let result = {}

    if (field === FOLLOWING) {
        result.isFollowing = ifUserExist
    } else {
        result.isFollower = ifUserExist
    }

    return result
}

const resolver = {
    Query: {
        getFollowers: getUsers(FOLLOWERS),
        getFollowing: getUsers(FOLLOWING),
        getIsFollower: checkIfUser(FOLLOWERS),
        getIsFollowing: checkIfUser(FOLLOWING),
    },
}

export default resolver
