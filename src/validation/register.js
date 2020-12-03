import Validator from 'validator'
import is_empty from 'validation/is_empty'


const validate_register_input = (data) => {
    let errors= {}

    const validatorProperties = [
        'name',
        'email',
        'password',
        'confirmPassword',
    ]

    // if the property is empty then turn into empty string otherwise no change.
    for (const property of validatorProperties) {
        data[property ] = !is_empty(
            data[property]
        )
            ? data[property]
            : ''
    }

    // check valid name. must be min 3 and max 30
    if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
        errors.name = 'Name must be between 2 and 30'
    }

    // check if name is empty
    if (Validator.isEmpty(data.name)) {
        errors.name = 'name field is required'
        errors.name[0].toUpperCase()
    }

    // check if email is empty
    if (Validator.isEmpty(data.email)) {
        errors.email = 'email field is required'
        errors.email[0].toUpperCase()
    }

    // check if email is valid
    if (!Validator.isEmail(data.email)) {
        errors.email = 'invalid email address'
        errors.email[0].toUpperCase()
    }

    // check if password is empty
    if (Validator.isEmpty(data.password)) {
        errors.password = 'password is invalid'
        errors.password[0].toUpperCase()
    }

    // check if password is valid
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'password must be at least 6 characters'
    }

    // check if password2 is empty
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'confirm password field is required'
        errors.confirmPassword[0].toUpperCase()
    }

    // check if two password is matched
    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'passwords must match'
    }
    return {
        errors,
        isValid: is_empty(errors),
    }
}

export default validate_register_input
