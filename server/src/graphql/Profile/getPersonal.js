import Profile from 'models/Profile'

const PERSONAL = 'personal'
const EXPERIENCE = 'experience'
const EDUCATION = 'education'
const SOCIAL = 'social'

const resolverFunction = (field) => {
    return async (_, { Input: { userId } }) => {
        const query = await Profile.findOne({ user: userId }, field)

        return query[`${field}`]
    }
}

const resolver = {
    Query: {
        getPersonal: resolverFunction(PERSONAL),
        getExperience: resolverFunction(EXPERIENCE),
        getEducation: resolverFunction(EDUCATION),
        getSocial: resolverFunction(SOCIAL),
    },
}

export default resolver
