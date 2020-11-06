import Validator from 'validator'
import is_empty from 'validation/is_empty'

export interface validator_data {
    school: string
    degree: string
    fieldOfStudy: string
    from: string
}

interface error_data {
    school?: string
    degree?: string
    fieldOfStudy?: string
    from?: string
}

const validate_education_input = (data: validator_data) => {
    // the error object
    let errors: error_data = {}

    const validator_properties: string[] = [
        'school',
        'degree',
        'fieldOfStudy',
        'from',
    ]

    // if the property is empty then turn into empty string otherwise no change.
    for (const property of validator_properties) {
        data[property as keyof validator_data] = !is_empty(
            data[property as keyof validator_data]
        )
            ? data[property as keyof validator_data]
            : ''
    }

    // check title is empty
    if (Validator.isEmpty(data.school)) {
        errors.school = 'school field is required'
        errors.school[0].toUpperCase()
    }

    // check company is empty
    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'degree field is required'
        errors.degree[0].toUpperCase()
    }

    // check company is empty
    if (Validator.isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = 'degree field is required'
        errors.fieldOfStudy[0].toUpperCase()
    }

    // check from is empty
    if (Validator.isEmpty(data.from)) {
        errors.from = 'from field is required'
        errors.from[0].toUpperCase()
        // console.log(data.from ? true : null)
    }

    return {
        errors,
        isValid: is_empty(errors),
    }
}

export default validate_education_input
