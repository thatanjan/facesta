import Profile from 'models/Profile'

const updateSingleField = (field) => {
    return async (_, { Input: data }, { user: { id } }) => {
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
