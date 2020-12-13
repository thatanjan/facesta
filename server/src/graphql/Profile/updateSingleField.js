import Profile from 'models/Profile'

const updateSingleField = (field) => {
    return async (_, { Input: { id, ...data } }) => {
        const update = await Profile.findOneAndUpdate({ user: id }, data, {
            new: true,
            projection: field,
            useFindAndModify: false,
        })

        return update
    }
}

const resolver = {
    Mutation: {
        updatePrivacy: updateSingleField('public'),
    },
}

export default resolver
