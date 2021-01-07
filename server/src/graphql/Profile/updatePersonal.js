import Profile from 'models/Profile'

const resolver = {
    Mutation: {
        updatePersonal: async (_, { Input }, { user: { id } }) => {
            const updateObject = {}

            for (let i in Input) {
                updateObject[`personal.${i}`] = Input[i]
            }

            const update = await Profile.findOneAndUpdate(
                { user: id },
                updateObject,
                {
                    projection: 'personal',
                    useFindAndModify: false,
                    new: true,
                }
            )

            return update.personal
        },
    },
}

export default resolver
