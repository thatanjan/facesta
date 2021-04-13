import Validator from 'validator'
import isEmpty from 'validation/is_empty'

const validateRegisterInput = data => {
	const theData = data

	const errors = {}

	const validatorProperties = ['name', 'email', 'password', 'confirmPassword']

	validatorProperties.forEach(property => {
		theData[property] = !isEmpty(theData[property]) ? theData[property] : ''
	})

	if (!Validator.isLength(theData.name, { min: 3, max: 30 })) {
		errors.name = 'Name must be between 2 and 30'
	}

	if (Validator.isEmpty(theData.name)) {
		errors.name = 'name field is required'
		errors.name[0].toUpperCase()
	}

	if (Validator.isEmpty(theData.email)) {
		errors.email = 'email field is required'
		errors.email[0].toUpperCase()
	}

	if (!Validator.isEmail(theData.email)) {
		errors.email = 'invalid email address'
		errors.email[0].toUpperCase()
	}

	if (Validator.isEmpty(theData.password)) {
		errors.password = 'password is invalid'
		errors.password[0].toUpperCase()
	}

	if (!Validator.isLength(theData.password, { min: 6, max: 30 })) {
		errors.password = 'password must be at least 6 characters'
	}

	if (Validator.isEmpty(theData.confirmPassword)) {
		errors.confirmPassword = 'confirm password field is required'
		errors.confirmPassword[0].toUpperCase()
	}

	if (!Validator.equals(theData.password, theData.confirmPassword)) {
		errors.confirmPassword = 'passwords must match'
	}
	return {
		errors,
		isValid: isEmpty(errors),
	}
}

export default validateRegisterInput
