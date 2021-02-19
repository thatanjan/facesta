import { ERROR_MESSAGE, MESSAGE, ERROR } from 'variables/global'

const resolvers = {
	ErrorOrMessage: obj => {
		if (obj[ERROR_MESSAGE]) {
			return ERROR
		}

		if (obj[MESSAGE]) {
			return MESSAGE
		}

		return null
	},
}

export default resolvers
