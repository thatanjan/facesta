import Profile from 'models/Profile'

import { filterUniqueString } from 'utils/unique'

const resolver = {
    Mutation: {
        updatePersonal: async (_, { Input }) => {
            const updateObject = {}

            for (let i in Input) {
                if (i === 'id' || i === 'skills') {
                } else {
                    updateObject[`personal.${i}`] = Input[i]
                }
            }

            const update = await Profile.findOneAndUpdate(
                { user: Input.id },
                updateObject,
                {
                    projection: 'personal',
                    useFindAndModify: false,
                    new: true,
                }
            )

            const skills = Input.skills
            const existingSkills = update.personal.skills

            const newSkills = filterUniqueString(skills, existingSkills)

            if (newSkills.length !== 0) {
                update.personal.skills.push(...newSkills)
                update.save()
            }

            return update.personal
        },
    },
}

export default resolver
