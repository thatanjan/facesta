import Profile from 'models/Profile'

const addFields = async ({ field, Input: data, id }) => {
	const result = await Profile.findOne({ user: id }, field)

	result[field].push(data)

	result.save()

	let returnData = result[field]

	return returnData[returnData.length - 1]
}

const EXPERIENCE = 'experience'
const EDUCATION = 'education'

const resolverFunction = field => {
	return async (_, { Input }, { user: { id } }) => {
		return await addFields({ field, Input, id })
	}
}

const resolver = {
	Mutation: {},
}

export default resolver
