import Validator from 'validator'
import is_empty from 'validation/is_empty'

export interface validator_data {
    text: string
}

interface error_data {
    text?: string
}

const validate_post_input = (data: validator_data) => {
    // the error object
    let errors: error_data = {}

    const validator_properties: string[] = ['text']

    // if the property is empty then turn into empty string otherwise no change.
    for (const property of validator_properties) {
        data[property as keyof validator_data] = !is_empty(
            data[property as keyof validator_data]
        )
            ? data[property as keyof validator_data]
            : ''
    }

    // text length validate
    if (!Validator.isLength(data.text, { min: 10, max: 30 })) {
        errors.text = 'Post must be between 10 and 300 characters'
    }

    // check text is empty
    if (Validator.isEmpty(data.text)) {
        errors.text = 'password is required'
        errors.text[0].toUpperCase()
    }

    return {
        errors,
        isValid: is_empty(errors),
    }
}

export default validate_post_input
