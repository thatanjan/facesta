import Validator from 'validator'
import is_empty from './is_empty'

export interface validator_data {
    email: string
    password: string
}

interface error_data {
    email?: string
    password?: string
}

const validate_login_input = (data: validator_data) => {
    // the error object
    let errors: error_data = {}

    const validator_properties: string[] = ['email', 'password']

    // if the property is empty then turn into empty string otherwise no change.
    for (const property of validator_properties) {
        data[property as keyof validator_data] = !is_empty(
            data[property as keyof validator_data]
        )
            ? data[property as keyof validator_data]
            : ''
    }

    // check email valid
    if (!Validator.isEmail(data.email)) {
        errors.email = 'invalid email address'
        errors.email[0].toUpperCase()
    }

    // check email is empty
    if (Validator.isEmpty(data.email)) {
        errors.email = 'email field is required'
        errors.email[0].toUpperCase()
    }

    // check password is empty
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
