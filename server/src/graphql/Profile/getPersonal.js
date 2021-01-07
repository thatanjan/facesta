import Profile from 'models/Profile'

const resolver = {
    Query: {
        getPersonal: async (_, { Input: { id } }) => {
            const { personal } = await Profile.findOne({ user: id }, 'personal')

            return personal
        },
    },
}

export default resolver
