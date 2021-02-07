import Follow from 'models/Follow'

const FOLLOWERS = 'followers'
const FOLLOWING = 'following'

const getUsers = (field) => async (_, { Input: { otherUserId } }) =>
    await Follow.findOne({ user: otherUserId }, field).populate(field)

const checkIfUser = (field) => async (
    _,
    { Input: { otherUserId } },
    { user: { id: ownerId } }
) => {
    if (otherUserId === ownerId) {
        return false
    }
    const query = await Follow.findOne({ user: ownerId }, field)

    const ifUserExist = query[field].includes(otherUserId)

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
