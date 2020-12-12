import Profile from 'models/Profile'

const resolver = {
    Mutation: {
        updatePersonal: async (_, { Input }) => {
            const updateObject = {}

            for (let i in Input) {
                if (i === 'id') {
                } else {
                    updateObject[`personal.${i}`] = Input[i]
                }
            }

            const update = await Profile.findOneAndUpdate(
                { user: Input.id },
                updateObject,
                { projection: 'personal', useFindAndModify: false, new: true }
            )

            console.log(update)

            return update.personal
        },
    },
}

export default resolver
