import Profile from 'models/Profile'

const addFields = async (field, Input) => {
    const { id, ...data } = Input

    const result = await Profile.findOne({ user: id }, field)

    result[field].push(data)

    result.save()

    let returnData = result[field]

    return returnData[returnData.length - 1]
}

const resolver = {
    Mutation: {
        addExperience: async (_, { Input }) => {
            const field = 'experience'

            return await addFields(field, Input)
        },

        addEducation: async (_, { Input }) => {
            const field = 'education'

            return await addFields(field, Input)
        },
    },
}

export default resolver
