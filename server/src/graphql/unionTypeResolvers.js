import { ERROR_MESSAGE, ERROR } from 'variables/global'

const checkIfErroType = obj => obj[ERROR_MESSAGE]

const resolvers = {
	Login: obj => {
		if (obj.token) return 'LoginToken'

		if (checkIfErroType(obj)) return ERROR

		if (obj.validationError) return 'ValidationErrorMessages'

		return null
	},
}

export default resolvers
