import Profile from 'models/Profile'

const resolver = {
    Mutation: {
        updateSocial: async (_, { Input: { id, ...data } }) => {
            const query = await Profile.findOne({ user: id }, 'social')

            for (let property in data) {
                query.social[property] = data[property]
            }

            const { social } = await query.save()

            return social
        },
    },
}

export default resolver
