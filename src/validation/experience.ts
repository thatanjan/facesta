import Validator from 'validator'
import is_empty from 'validation/is_empty'

export interface validator_data {
    title: string
    company: string
    from: string
}

interface error_data {
    title?: string
    company?: string
    from?: string
}

const validate_experience_input = (data: validator_data) => {
    // the error object
    let errors: error_data = {}

    const validator_properties: string[] = ['title', 'company', 'from']

    // if the property is empty then turn into empty string otherwise no change.
    for (const property of validator_properties) {
        data[property as keyof validator_data] = !is_empty(
            data[property as keyof validator_data]
        )
            ? data[property as keyof validator_data]
            : ''
    }

    // check title is empty
    if (Validator.isEmpty(data.title)) {
        errors.title = 'job Title field is required'
        errors.title[0].toUpperCase()
    }

    // check company is empty
    if (Validator.isEmpty(data.company)) {
        errors.company = 'company field is required'
        errors.company[0].toUpperCase()
    }
    // check from is empty
    if (Validator.isEmpty(data.from)) {
        // errors.from = 'from field is required'
        // errors.from[0].toUpperCase()
        console.log(data.from ? true : null)
    }

    return {
        errors,
        isValid: is_empty(errors),
    }
}

export default validate_experience_input
