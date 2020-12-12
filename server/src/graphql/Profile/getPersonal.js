import Profile from 'models/Profile'

const resolver = {
    Query: {
        getPersonal: async (_, { Input: { id } }) => {
            const profile = await Profile.findOne({ user: id }, 'personal')
            console.log(profile)

            return { text: 'hello' }
        },
    },
}

export default resolver
