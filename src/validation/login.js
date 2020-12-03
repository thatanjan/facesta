import Validator from 'validator'
import is_empty from 'validation/is_empty'

const validate_login_input = (data) => {
    let errors = {}

    const validator_properties = ['email', 'password']

    for (const property of validator_properties) {
        data[property] = !is_empty(data[property]) ? data[property] : ''
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'invalid email address'
        errors.email[0].toUpperCase()
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'email field is required'
        errors.email[0].toUpperCase()
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'password is required'
        errors.password[0].toUpperCase()
    }

    return {
        errors,
        isValid: is_empty(errors),
    }
}

export default validate_login_input
